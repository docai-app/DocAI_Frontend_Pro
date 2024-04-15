'use client';

import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import { getAllChainFeatureDatas } from '../../../apis/AirtableChainFeature';
import { Folder } from '../../../components/common/Widget/FolderTree';
import useAlert from '../../../hooks/useAlert';
import CreateView from './CreateView';

const apiSetting = new Api();

function CreateContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const [open, setOpen] = useState(false);
    const [multipleDest, setMultipleDest] = useState<Folder[]>([]);
    const [{ data, loading: submitting, error }, createChatbot] = useAxios(
        apiSetting.Chatbot.createChatbot(),
        { manual: true }
    );
    const [{ data: updateChatboxData, loading: updateing }, updateChatbot] = useAxios(
        {},
        { manual: true }
    );
    const [{ data: assistant_agents_data }, assistant_agents] = useAxios(
        apiSetting.Assistant.assistant_agents(),
        { manual: false }
    );
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const [chatbot, setChatbot] = useState<any>({});
    const [actionContent, setActionContent] = useState('');
    const [chain_features, set_chain_features] = useState<any>([]);
    const [expert_ids, setExpert_ids] = useState<any>([]);

    const [{ data: getChatbotData, loading: loading }, getChatbot] = useAxios(
        apiSetting.Chatbot.getChatbotById(searchParams.get('id') || ''),
        { manual: true }
    );

    useEffect(() => {
        if (searchParams.has('id')) {
            getChatbot();
        }
    }, [searchParams]);

    useEffect(() => {
        setLoad({ show: loading });
    }, [loading]);

    useEffect(() => {
        setLoad({ show: updateing, content: '正在保存數據' });
    }, [updateing]);

    useEffect(() => {
        setLoad({ show: submitting, content: '正在保存數據' });
    }, [submitting]);

    useEffect(() => {
        getAllChainFeatureDatas().then((res) => {
            set_chain_features(res);
        });
    }, []);

    const handleCreate = useCallback(async () => {
        if (searchParams.has('id')) {
            handleUpdate();
        } else {
            if (_.isEmpty(chatbot?.meta?.selected_features)) {
                setAlert({ title: '必須選擇一項功能', type: 'warning' });
                return;
            }
            setActionContent('正在保存數據');
            const res = await createChatbot({
                data: {
                    name: chatbot?.name,
                    description: chatbot?.description,
                    is_public: chatbot?.is_public,
                    expired_at: chatbot?.expired_at,
                    source: {
                        folder_id: multipleDest.map((f) => f.id)
                    },
                    chain_features: chain_feature_ids,
                    language: chatbot?.meta?.language,
                    tone: chatbot?.meta?.tone,
                    category: chatbot?.category,
                    assistant: chatbot?.meta?.assistant,
                    length: chatbot?.meta?.length,
                    experts: expert_ids,
                    selected_features: chatbot?.meta?.selected_features,
                    selected_features_titles: chatbot?.meta?.selected_features_titles
                }
            });
            if (res.data?.success) router.push('/chatbot');
        }
    }, [router, chatbot, chain_feature_ids, expert_ids, multipleDest]);

    const handleUpdate = useCallback(async () => {
        if (_.isEmpty(chatbot?.meta?.selected_features)) {
            setAlert({ title: '必須選擇一項功能', type: 'warning' });
            return;
        }

        if (searchParams.has('id')) {
            setActionContent('正在保存數據');
            const res = await updateChatbot({
                ...apiSetting.Chatbot.updateChatbotById(searchParams.get('id') || ''),
                data: {
                    name: chatbot?.name,
                    description: chatbot?.description,
                    is_public: chatbot?.is_public,
                    expired_at: chatbot?.expired_at,
                    source: {
                        folder_id: multipleDest.map((f) => f.id)
                    },
                    chain_features: chain_feature_ids,
                    language: chatbot?.meta?.language,
                    tone: chatbot?.meta?.tone,
                    category: chatbot?.category,
                    assistant: chatbot?.meta?.assistant,
                    length: chatbot?.meta?.length,
                    experts: expert_ids,
                    selected_features: chatbot?.meta?.selected_features,
                    selected_features_titles: chatbot?.meta?.selected_features_titles
                }
            });
            // if (res.data?.success) router.push('/chatbot');
        }
    }, [router, chatbot, chain_feature_ids, expert_ids, multipleDest]);

    useEffect(() => {
        if (getChatbotData && getChatbotData.success) {
            // console.log(getChatbotData);
            setChatbot(getChatbotData?.chatbot);
            setMultipleDest(getChatbotData?.folders || []);
            set_chain_feature_ids(getChatbotData.chatbot?.meta?.chain_features || []);
            setExpert_ids(getChatbotData.chatbot?.meta?.experts || []);
        }
    }, [router, getChatbotData]);

    useEffect(() => {
        if (updateChatboxData && updateChatboxData.success) {
            router.push('/chatbot');
            // console.log('updateChatboxData', updateChatboxData);
        }
    }, [updateChatboxData]);

    return (
        <CreateView
            {...{
                chatbot,
                setChatbot,
                multipleDest,
                setMultipleDest,
                handleCreate,
                chain_feature_ids,
                set_chain_feature_ids,
                actionContent,
                chain_features,
                assistant_agents_data,
                expert_ids,
                setExpert_ids
            }}
        />
    );
}

export default CreateContainer;
