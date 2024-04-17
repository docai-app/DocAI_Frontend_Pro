import Api from '@/apis';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import useAxios from 'axios-hooks';
import moment from 'moment';
import * as React from 'react';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from './types';

const apiSetting = new Api();

type MessagesPaneProps = {
    chat: ChatProps;
};

export default function MessagesPane(props: MessagesPaneProps) {
    const { chat } = props;
    const [chatMessages, setChatMessages] = React.useState(chat.messages);
    const [textAreaValue, setTextAreaValue] = React.useState('');
    const [model, setModel] = React.useState<'none' | 'chart' | 'statistics'>('none')

    React.useEffect(() => {
        setChatMessages(chat.messages);
    }, [chat.messages]);

    const [{ data: getDocAiLLMData, loading: loading }, getDocAiLLM] = useAxios(
        apiSetting.Prompt.doc_ai_llm(''),
        {
            manual: true
        }
    );

    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const [
        { data: generateStatisticsData, loading: generateStatisticsLoading },
        generateStatistics
    ] = useAxios('', { manual: true });

    const handleSendMessage = () => {
        switch (model) {
            case 'chart':
                handlerGenerateChart('101324d3-5d70-4dc7-9028-b1e8fe7ba224', textAreaValue)
                break;
            case 'statistics':
                handlerGenerateStatistics('101324d3-5d70-4dc7-9028-b1e8fe7ba224', textAreaValue)
                break;
            default:
                handleGeneralMessage(textAreaValue)
                break;
        }
    }

    const addMessageToChat = (content: any, type?: string) => {
        const newId = chatMessages.length + 1;
        const newIdString = newId.toString();
        setChatMessages((arr) => [
            ...arr,
            {
                id: newIdString,
                sender: { username: 'ai', name: 'ai', avatar: '', online: false },
                content: content,
                type: type || 'text',
                timestamp: moment().format('MM-DD HH:mm'),
            },
        ]);
    }

    const handleGeneralMessage = async (prompt: string) => {
        if (prompt) {
            const res = await getDocAiLLM(
                apiSetting.Prompt.doc_ai_llm(prompt)
            );
            if (res.data.success) {
                addMessageToChat(res.data.data.raw_response)
            }
        }
    }

    const handlerGenerateChart = async (smart_extraction_schema_id: string, query: string) => {
        if (query) {

            // setOpen(true);
            // setModalDescription({
            //     title: '進行中......',
            //     content: '請耐心等候...'
            // });
            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                addMessageToChat(res.data.chart, 'chart')
                // setVisibleHtmlCode(true);
                // setChart(res.data.chart);
                // setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                // setAlert({ title: res.data.chart, type: 'error' });
            }
            // setOpen(false);
        }
    };


    const handlerGenerateStatistics = async (smart_extraction_schema_id: string, query: string) => {
        console.log('query', query);
        console.log('smart_extraction_schema_id', smart_extraction_schema_id);

        if (query) {

            // setOpen(true);
            // setModalDescription({
            //     title: '進行中......',
            //     content: '請耐心等候...'
            // });
            const res = await generateStatistics(
                apiSetting.SmartExtractionSchemas.generateStatistics(
                    smart_extraction_schema_id,
                    query
                )
            );
            if (res.data.success) {
                addMessageToChat(res.data.report, 'text')
                // setVisibleHtmlToPdf(true);
                // setReport(res.data.report);
                // setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                // setAlert({ title: res.data.report, type: 'error' });
            }
            // setOpen(false);
        }
    };



    return (
        <Sheet
            sx={{
                height: { xs: 'calc(95dvh - var(--Header-height))', lg: '95dvh' },
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.level1',
            }}
        >
            <MessagesPaneHeader sender={chat.sender} />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: 'scroll',
                    flexDirection: 'column-reverse',
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {chatMessages.map((message: MessageProps, index: number) => {
                        const isYou = message.sender === 'You';
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                flexDirection={isYou ? 'row-reverse' : 'row'}
                            >
                                {message.sender !== 'You' && (
                                    <AvatarWithStatus
                                        src={message.sender.avatar}
                                    />
                                )}
                                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
                            </Stack>
                        );
                    })}
                </Stack>
            </Box>
            <MessageInput
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                model={model}
                setModel={setModel}
                onSubmit={() => {

                    console.log(model);

                    const newId = chatMessages.length + 1;
                    const newIdString = newId.toString();
                    setChatMessages((arr) => [
                        ...arr,
                        {
                            id: newIdString,
                            sender: 'You',
                            type: 'text',
                            content: textAreaValue,
                            timestamp: moment().fromNow(),
                        },
                    ]);
                    handleSendMessage()
                }}
            />
        </Sheet>
    );
}
