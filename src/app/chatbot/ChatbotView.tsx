import ChatbotList from '@/components/Chatbot/ChatbotList';
import ChatbotTable from '@/components/Chatbot/ChatbotTable';
import ShareQRcodeModal from '@/components/Chatbot/feature/ShareQRcodeModal';
import AlertDialogModal from '@/components/common/Widget/AlertDialogModal';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Chatbot, Chatbots } from './ChatbotContainer';
interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
    handleDeleteChatbot: any;
    handleShare: any;
    qrcodeContent: any;
    visibleQRcode: boolean;
    setVisibleQRcode: any;
}

function ChatbotView(props: ViewProps) {
    const {
        chatbots,
        meta,
        handleDeleteChatbot,
        handleShare,
        qrcodeContent,
        visibleQRcode,
        setVisibleQRcode
    } = props;

    const router = useRouter()
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [currectChabot, setCurrectChabot] = useState<Chatbot>()

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon />}
                    sx={{ pl: 0 }}
                >
                    <Link underline="none" color="neutral" href="/" aria-label="Home">
                        <HomeRoundedIcon />
                    </Link>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                        助手
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography level="h2" component="h1">
                    智能助手
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                    onClick={() => {
                        router.push('/chatbot/edit')
                    }}>
                    新增助手
                </Button>
            </Box>
            <ChatbotTable
                chatbots={chatbots}
                meta={meta}
                handleDeleteChatbot={(chatbot: any) => { setCurrectChabot(chatbot); setVisibleDelete(true) }}
                handleShare={handleShare}
            />
            <ChatbotList
                chatbots={chatbots}
                meta={meta}
                handleDeleteChatbot={(chatbot: any) => { setCurrectChabot(chatbot); setVisibleDelete(true) }}
                handleShare={handleShare}
            />

            <ShareQRcodeModal
                visable={visibleQRcode}
                title={'掃描QR-code來訪問智能助手'}
                name={qrcodeContent?.name}
                link={qrcodeContent?.link}
                cancelClick={() => {
                    setVisibleQRcode(false);
                }}
            />

            <AlertDialogModal
                visible={visibleDelete}
                setVisible={setVisibleDelete}
                content={`是否刪除 ${currectChabot?.name}?`}
                confirm={() => {
                    handleDeleteChatbot(currectChabot?.id)
                }}
            />
        </>
    );
}

export default ChatbotView;
