import * as Sentry from '@sentry/serverless';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import axios from 'axios';
import { parse } from 'path';
import * as web3 from '@solana/web3.js';
import {
    SafteyKeyMessage,
    parseAndValidateSafteyKeyMessage,
} from '../../../models/step-functions/saftey-key-sweep.model.js';
import { fetchSingleUseKeypair } from '../../../services/fetch-single-use-keypair.service.js';
import { fetchGasKeypair } from '../../../services/fetch-gas-keypair.service.js';
import { createSweepingTransaction, sendTransaction } from '../../../utilities/transaction.utility.js';
import { deleteSingleUseKeypair } from '../../../services/s3/delete-single-use-keypair.service.js';

export const safteyKeySweep = Sentry.AWSLambda.wrapHandler(
    async (event: unknown): Promise<APIGatewayProxyResultV2> => {
        let safteyKeyMessage: SafteyKeyMessage;
        let gasKeypair: web3.Keypair;
        let singleUseKeypair: web3.Keypair;
        let transaction: web3.Transaction;

        try {
            safteyKeyMessage = parseAndValidateSafteyKeyMessage(event);
        } catch (error) {
            console.log(error);
            // TODO: Log in sentry
            throw new Error('Could not parse and validate the saftey key message');
        }

        try {
            gasKeypair = await fetchGasKeypair();
            singleUseKeypair = await fetchSingleUseKeypair(safteyKeyMessage.key);
        } catch (error) {
            // TODO: Should we throw is back into the step functions?
            // TODO: Log in sentry
            console.log(error);
            throw error;
        }

        try {
            transaction = await createSweepingTransaction(singleUseKeypair.publicKey, gasKeypair.publicKey);
            transaction.partialSign(singleUseKeypair);
            transaction.partialSign(gasKeypair);
        } catch (error) {
            console.log(error);
            // TODO: Log in sentry
            // TODO: Why can't we create, should we retry?
            throw error;
        }

        try {
            await sendTransaction(transaction);
        } catch (error) {
            console.log(error);
            // TODO: Log in sentry
            // TODO: Why can't we send, should we rety?
            throw error;
        }

        try {
            await deleteSingleUseKeypair(safteyKeyMessage.key);
        } catch (error) {
            console.log(error);
            // TODO: Log in sentry
            // TODO: Why can't we delete, should we retry?
        }

        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    },
    {
        rethrowAfterCapture: true,
    }
);