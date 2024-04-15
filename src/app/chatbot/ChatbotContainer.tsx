'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { encrypt } from '@/utils/util_crypto';
import useAxios from 'axios-hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatbotView from './ChatbotView';

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
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [chatbots, setChatbots] = useState<Chatbots[]>([]);
    const [meta, setMeta] = useState<any>();
    const [visibleQRcode, setVisibleQRcode] = useState(false);
    const [qrcodeContent, setQrcodeContent] = useState<any>();
    const [
        { data: showAllChatbotsData, loading: showAllChatbotsLoading, error: showAllChatbotsError },
        getAllChatbots
    ] = useAxios({}, { manual: true });

    const [{ data: deleteChatbotByIdData }, deleteChatbotById] = useAxios(
        apiSetting.Chatbot.deleteChatbotById(''),
        { manual: true }
    );

    const [{ data: getShareSignatureData, loading: getShareSignatureLoading }, getShareSignature] =
        useAxios({}, { manual: true });

    useEffect(() => {
        setLoad({ show: true });
        getAllChatbots(apiSetting.Chatbot.showAllChatbots(page));
    }, [page]);

    useEffect(() => {
        if (searchParams) {
            setPage(parseInt(searchParams.get('page') || '1'));
        }
    }, [searchParams]);

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

    useEffect(() => {
        if (deleteChatbotByIdData && deleteChatbotByIdData.success) {
            setAlert({ title: '删除成功!', type: 'success' });
            setLoad({ show: false });
            router.refresh();
        } else if (deleteChatbotByIdData && !deleteChatbotByIdData.success) {
            setLoad({ show: false });
            setAlert({ title: deleteChatbotByIdData.error, type: 'error' });
        }
    }, [deleteChatbotByIdData]);

    const handleDeleteChatbot = (chatbot_id: string) => {
        // console.log('chatbot_id', chatbot_id);
        setLoad({ show: true, content: '正在刪除數據...' });
        deleteChatbotById({
            ...apiSetting.Chatbot.deleteChatbotById(chatbot_id)
        });
    };

    const handleShare = (chatbot: Chatbot) => {
        setLoad({ show: true, content: '正在獲取連結...' });
        getShareSignature({
            ...apiSetting.Chatbot.getShareSignature(chatbot.id)
        }).then((res) => {
            setLoad({ show: false });
            if (res.data.success) {
                const decodedKey = atob(res.data.signature);
                const encryptedText = encrypt(decodedKey);
                const link =
                    process.env.NEXT_PUBLIC_CHATBOT_URL +
                    `${chatbot.id}?token_key=${encryptedText}`;
                setQrcodeContent({
                    ...chatbot,
                    link: link
                });
                setVisibleQRcode(true);
            }
        });
    };

    return (
        <ChatbotView
            {...{
                chatbots,
                meta,
                handleDeleteChatbot,
                handleShare,
                qrcodeContent,
                visibleQRcode,
                setVisibleQRcode
            }}
        />
    );
}

export default ChatbotContainer;
