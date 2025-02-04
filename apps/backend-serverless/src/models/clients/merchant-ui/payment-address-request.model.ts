import { InferType, boolean, object, string } from 'yup';
import { parseAndValidateStrict } from '../../../utilities/yup.utility.js';

export const merchantUpdateRequestBodySchema = object().shape({
    paymentAddress: string().optional(),
    name: string().optional(),
    acceptedTermsAndConditions: boolean().optional(),
    acceptedPrivacyPolicy: boolean().optional(),
    dismissCompleted: boolean().optional(),
    kybInquiry: string().optional(),
});

export type MerchantUpdateRequest = InferType<typeof merchantUpdateRequestBodySchema>;

export const parseAndValidatePaymentAddressRequestBody = (
    merchantUpdateRequestBody: unknown,
): MerchantUpdateRequest => {
    return parseAndValidateStrict(
        merchantUpdateRequestBody,
        merchantUpdateRequestBodySchema,
        'Could not parse the merchant update request body. Unknown Reason.',
    );
};
