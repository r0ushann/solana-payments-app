import { removeNotification } from '@/features/notification/notificationSlice';
import { fetchWalletBalance, getWalletPubkey } from '@/features/wallet/walletSlice';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WalletHandler: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pubkey = useSelector(getWalletPubkey);

    useEffect(() => {
        if (pubkey) {
            dispatch(fetchWalletBalance(pubkey));
        } else {
            dispatch(removeNotification());
        }
    }, [dispatch, pubkey]);

    return null;
};

export default WalletHandler;
