'use client';

import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Api from '../../apis';
import ShopView from './ShopView';

const apiSetting = new Api();

export default function ShopContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [
        { data: showAllChatbotsData, loading: showAllChatbotsLoading, error: showAllChatbotsError },
        getAllChatbots
    ] = useAxios({}, { manual: true });

    useEffect(() => {
        getAllChatbots(apiSetting.Chatbot.showAllChatbots(1));
    }, []);

    return (
        <ShopView
            {...{
                open,
                setOpen,
                showAllChatbotsData
            }}
        />
    );
}
