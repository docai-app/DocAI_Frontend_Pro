import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import { ChatProps, MessageProps, UserProps } from '@/utils/types';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { v4 } from 'uuid';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import WritingView from './WritingView';
const apiSetting = new Api();

type MessagesPaneProps = {
    chat: ChatProps | undefined;
    getAllLabelsData: any;
    getAllSchemasData: any;
};

export default function MessagesPane(props: MessagesPaneProps) {
    const { chat, getAllLabelsData, getAllSchemasData } = props;
    const { setAlert } = useAlert();
    const [chatMessages, setChatMessages] = React.useState<MessageProps[]>([]);
    const [textAreaValue, setTextAreaValue] = React.useState('');
    const [model, setModel] = React.useState('');
    const [sender, setSender] = React.useState<UserProps>();
    const [writing, setWriting] = React.useState(false)

    React.useEffect(() => {
        if (chat) {
            const tmp = window.localStorage?.getItem(
                'chat_by_' + window.localStorage?.getItem('email')
            );
            let localChats: any;
            if (tmp && tmp.length > 0) {
                localChats = JSON.parse(tmp);
            }
            const _chat = _.find(localChats, function (c) {
                return c.id == chat.id;
            });
            setChatMessages(_chat?.messages || []);
            setSender(chat.sender);
            setModel(chat.sender?.model_type?.value)
        }
    }, [chat]);

    const [{ data: getDocAiLLMData, loading: loading }, getDocAiLLM] = useAxios(
        apiSetting.Prompt.doc_ai_llm(''),
        {
            manual: true
        }
    );

    const [{ data: assistantMessageData, loading: assistantMessageDataing }, assistantMessag] =
        useAxios(apiSetting.Document.assistant_message(''), { manual: true });


    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const [
        { data: generateStatisticsData, loading: generateStatisticsLoading },
        generateStatistics
    ] = useAxios('', { manual: true });

    const handleSendMessage = () => {
        console.log(sender);
        setWriting(true)
        switch (sender?.source?.value) {
            case 'schema':
                switch (sender?.model_type?.value) {
                    case 'chart':
                        handlerGenerateChart(sender?.source?.schema?.id, textAreaValue);

                        break;
                    case 'statistics':
                        handlerGenerateStatistics(sender?.source?.schema?.id, textAreaValue);
                        break;
                    default:
                        console.log('sender', sender);

                        break;
                }
                break;
            case 'documents':
                switch (sender?.model_type?.value) {
                    default:
                        handleDocumentMessage(sender?.source?.document?.id, textAreaValue)
                        break;
                }
                break;
            default:
                handleGeneralMessage(textAreaValue);
                break;
        }

    };

    const addMessageToChat = (content: any, type?: string) => {
        const message: MessageProps = {
            id: v4(),
            sender: sender || 'You',
            content: content,
            type: type || 'text',
            created_at: moment().format('YYYY-MM-DD HH:mm')
        };
        setChatMessages((arr) => [...arr, message]);
        addMessageToLocalStorage(message);
    };

    /**
     * 添加消息到本地
     * @param message
     */
    const addMessageToLocalStorage = (message: any) => {
        let localChats: any = getChatsFromLocalStorage();

        const _chats = _.map(localChats, (cha: ChatProps) => {
            if (cha?.id == chat?.id) {
                cha.messages.push(message);
                return {
                    ...cha,
                    messages: cha.messages
                };
            } else {
                return cha;
            }
        });
        // console.log('_chats', _chats);
        saveChatsToLocalSrory(_chats);
    };

    const updateChatSender = (_sender: UserProps) => {
        let localChats: any = getChatsFromLocalStorage();
        setSender(_sender);
        const _chats = _.map(localChats, (cha: ChatProps) => {
            if (cha?.id == chat?.id) {
                return {
                    ...cha,
                    sender: _sender
                };
            } else {
                return cha;
            }
        });
        saveChatsToLocalSrory(_chats);
    };

    function getChatsFromLocalStorage() {
        let localChats: any = window.localStorage?.getItem(
            'chat_by_' + window.localStorage?.getItem('email')
        );
        localChats = JSON.parse(localChats) || [];
        return localChats;
    }

    function saveChatsToLocalSrory(localChats: any) {
        try {
            window.localStorage?.setItem(
                'chat_by_' + window.localStorage?.getItem('email'),
                JSON.stringify(localChats)
            );
        } catch (error) {
            setAlert({
                title: '聊天記錄保存已超出限額，請清空聊天記錄歷史再試!!',
                type: 'error'
            });
        }
    }

    const handleGeneralMessage = async (prompt: string) => {
        if (prompt) {
            const res = await getDocAiLLM(apiSetting.Prompt.doc_ai_llm(prompt, sender?.model_type?.value));
            if (res.data.success) {
                addMessageToChat(res.data.data.raw_response);
            }
            setWriting(false)
        }
    };

    const handleDocumentMessage = async (document_id: string, content: string) => {
        console.log('document_id', document_id);

        const res = await assistantMessag({
            ...apiSetting.Document.assistant_message(document_id),
            data: {
                query: content,
                chat_history: []
            }
        });
        if (res.data?.success) {
            console.log(res.data);
            addMessageToChat(res.data.message.content, 'text');
        } else {
            console.log(res.data);
        }
        setWriting(false)
    }

    const handlerGenerateChart = async (smart_extraction_schema_id: string, query: string) => {
        if (query) {
            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                addMessageToChat(res.data.chart, 'chart');
            } else {
                console.log(res.data);
                setAlert({ title: res.data.chart, type: 'error' });
            }
            setWriting(false)
        }
    };

    const handlerGenerateStatistics = async (smart_extraction_schema_id: string, query: string) => {
        console.log('query', query);
        console.log('smart_extraction_schema_id', smart_extraction_schema_id);

        if (query) {
            const res = await generateStatistics(
                apiSetting.SmartExtractionSchemas.generateStatistics(
                    smart_extraction_schema_id,
                    query
                )
            );
            if (res.data.success) {
                addMessageToChat(res.data.report, 'text');
            } else {
                setAlert({ title: res.data.report, type: 'error' });
            }
            setWriting(false)
        }
    };

    return (
        <Sheet
            sx={{
                height: { xs: 'calc(95dvh - var(--Header-height))', lg: '95dvh' },
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#eff7fe'
            }}
        >
            <MessagesPaneHeader sender={sender} />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: 'scroll',
                    flexDirection: 'column-reverse'
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {chatMessages?.map((message: MessageProps, index: number) => {
                        const isYou = message.sender === 'You';
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={1}
                                width={'100%'}
                                flexDirection={isYou ? 'row-reverse' : 'row'}
                            >
                                {message.sender !== 'You' && (
                                    <AvatarWithStatus src={message.sender.avatar} />
                                )}
                                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />

                            </Stack>
                        );
                    })}
                    {writing && <WritingView sender={sender} />}
                </Stack>
            </Box>
            <MessageInput
                writing={writing}
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                model={model}
                setModel={setModel}
                getAllLabelsData={getAllLabelsData}
                getAllSchemasData={getAllSchemasData}
                sender={sender}
                setSender={setSender}
                updateChatSender={updateChatSender}
                onSubmit={() => {
                    const message: MessageProps = {
                        id: v4(),
                        sender: 'You',
                        content: textAreaValue,
                        type: 'text',
                        created_at: moment().format('YYYY-MM-DD HH:mm')
                    };
                    setChatMessages((arr: any) => [...arr, message]);
                    addMessageToLocalStorage(message);

                    handleSendMessage();
                }}
            />
        </Sheet>
    );
}
