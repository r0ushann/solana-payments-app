import { PayingToken, getPayingToken, setPayingToken } from '@/features/payment-options/paymentOptionsSlice';
import { AppDispatch } from '@/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaymentTokenSelector = () => {
    const dispatch = useDispatch<AppDispatch>();
    const payingToken = useSelector(getPayingToken);

    const handlePayingTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPayingToken(event.target.value as PayingToken));
    };

    return (
        <div className="flex flex-row justify-end items-center w-full">
            <div className="pr-2 text-md text-gray-600">Pay with</div>
            <div className="tooltip tooltip-left" data-tip="More tokens coming soon!">
                <select
                    disabled
                    value={payingToken}
                    onChange={handlePayingTokenChange}
                    data-theme="mytheme"
                    className="select select-bordered w-fit max-w-xs"
                >
                    <option disabled>Currency</option>
                    {Object.values(PayingToken).map(token => {
                        return <option key={token}>{token}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default PaymentTokenSelector;
