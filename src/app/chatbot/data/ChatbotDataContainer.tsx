'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ChatbotDataView from './ChatbotDataView';

const apiSetting = new Api();

function ChatbotDataContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    useEffect(() => {
        console.log('home');
        setLoad({ show: false });
        // setAlert({ title: 'success', type: 'error' })
        // gatTags()
        return () => {};
    }, [router]);

    const gatTags = () => {
        getAllLabels().then((res) => {
            console.log(res.data);
        });
    };
    return (
        <ChatbotDataView
            {...{
                data
            }}
        />
    );
}

export default ChatbotDataContainer;
