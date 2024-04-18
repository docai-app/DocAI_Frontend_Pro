'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { ChatProps } from '@/utils/types';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import ChatView from './ChatView';

const apiSetting = new Api();
const newChat = {
    id: '',
    sender: {
        name: '新建聊天',
        username: '',
        avatar: '/static/images/avatar/2.jpg',
        source: ''
    },
    messages: []
};

function ChatContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const [chats, setChats] = useState<ChatProps[]>();

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getAllSchemasData, error: getAllSchemasError }, getAllSchemas] = useAxios(
        apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(),
        { manual: true }
    );

    useEffect(() => {
        let tmp: any = window.localStorage?.getItem(
            'chat_by_' + window.localStorage?.getItem('email')
        );
        tmp = JSON.parse(tmp);
        if (tmp && tmp.length > 0) {
            setChats(tmp);
        } else {
            tmp = [];
            tmp.push({
                ...newChat,
                id: v4()
            });
            window.localStorage?.setItem(
                'chat_by_' + window.localStorage?.getItem('email'),
                JSON.stringify(tmp)
            );
            setChats(tmp);
        }
        getAllSchemas();
        getAllLabels();
    }, []);

    const handleAddChat = () => {
        chats?.push({
            ...newChat,
            id: v4()
        });
        console.log('chats', chats);

        if (chats) {
            const newChats = [...chats];
            setChats(newChats);
        }
        window.localStorage?.setItem(
            'chat_by_' + window.localStorage?.getItem('email'),
            JSON.stringify(chats)
        );
        console.log(chats);
    };

    return (
        <ChatView
            {...{
                chats,
                getAllLabelsData,
                getAllSchemasData,
                handleAddChat
            }}
        />
    );
}

export default ChatContainer;
