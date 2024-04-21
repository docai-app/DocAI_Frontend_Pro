'use client';

import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import AssistiveQuestionView from './AssistiveQuestionView';
const apiSetting = new Api();
export default function AssistiveQuestionViewContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const searchParams = useSearchParams();
    const { id } = useParams();
    const [actionContent, setActionContent] = useState('');
    const [chatbot, setChatbot] = useState<any>({});
    const [assistive_questions, set_assistive_questions] = useState<any>([]);

    const [{ data: getChatbotData, loading: loading }, getChatbot] = useAxios(
        apiSetting.Chatbot.getChatbotById((id as string) || ''),
        { manual: true }
    );
    const [
        { data: updateChatbotAssistiveQuestionsByIdData, loading: updateing },
        updateChatbotAssistiveQuestionsById
    ] = useAxios(apiSetting.Chatbot.updateChatbotAssistiveQuestionsById((id as string) || ''), {
        manual: true
    });

    useEffect(() => {
        if (id) {
            setLoad({ show: true, content: '正在加載數據' });
            getChatbot();
        }
    }, [searchParams]);

    useEffect(() => {
        if (getChatbotData && getChatbotData.success) {
            // console.log(getChatbotData);
            setLoad({ show: false });
            setChatbot(getChatbotData.chatbot);
            set_assistive_questions(getChatbotData.chatbot?.assistive_questions || []);
        }
    }, [router, getChatbotData]);

    const handleUpdate = () => {
        setLoad({ show: true, content: '正在保存數據' });
        updateChatbotAssistiveQuestionsById({
            data: {
                assistive_questions: assistive_questions
            }
        });
    };

    useEffect(() => {
        if (
            updateChatbotAssistiveQuestionsByIdData &&
            updateChatbotAssistiveQuestionsByIdData.success
        ) {
            setAlert({ title: '保存成功', type: 'success' });
            router.push('/chatbot');
            setLoad({ show: false });
            // console.log('updateChatboxData', updateChatboxData);
        }
    }, [updateChatbotAssistiveQuestionsByIdData]);

    return (
        <AssistiveQuestionView
            {...{
                chatbot,
                assistive_questions,
                set_assistive_questions,
                handleUpdate
            }}
        />
    );
}
