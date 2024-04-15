'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HomeView from './ChatbotView';

const apiSetting = new Api();

export interface Chatbots {
    chatbot: Chatbot;
    folders: any;
}

export interface Chatbot {
    id: string;
    name: string;
    description: string;
    user_id: string;
    category: string;
    meta: any;
    source: {
        folder_id: string[];
    };
    created_at: string;
    updated_at: string;
}

function ChatbotContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    // const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [chatbots, setChatbots] = useState<Chatbots[]>([]);
    const [meta, setMeta] = useState<any>();

    const [
        { data: showAllChatbotsData, loading: showAllChatbotsLoading, error: showAllChatbotsError },
        getAllChatbots
    ] = useAxios({}, { manual: true });

    useEffect(() => {
        setLoad({ show: true });
        getAllChatbots(apiSetting.Chatbot.showAllChatbots(page));
    }, [page]);

    // useEffect(() => {

    // }, [searchParams]);

    // useEffect(() => {
    //     if (searchParams) {
    //         setPage(parseInt(searchParams.get('page') || '1'));
    //     }
    // }, [searchParams]);

    useEffect(() => {
        if (showAllChatbotsData?.success) {
            console.log(showAllChatbotsData.chatbots);

            setChatbots(showAllChatbotsData.chatbots);
            setMeta(showAllChatbotsData.meta);
            setLoad({ show: false });
        } else if (showAllChatbotsData && !showAllChatbotsData?.success) {
            setAlert({ title: showAllChatbotsData.error, type: 'error' });
            setLoad({ show: false });
        }
    }, [showAllChatbotsData]);

    const gatTags = () => {};
    return (
        <HomeView
            {...{
                chatbots,
                meta
            }}
        />
    );
}

export default ChatbotContainer;
