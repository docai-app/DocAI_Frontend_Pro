import ChatbotList from '@/components/Chatbot/ChatbotList';
import ChatbotTable from '@/components/Chatbot/ChatbotTable';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/joy';
import { Chatbots } from './ChatbotContainer';
interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
}

function ChatbotView(props: ViewProps) {
    const { chatbots, meta } = props;

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
                <Button color="primary" startDecorator={<AddIcon />} size="sm">
                    新增助手
                </Button>
            </Box>
            <ChatbotTable chatbots={chatbots} meta={meta} />
            <ChatbotList chatbots={chatbots} meta={meta} />
        </>
    );
}

export default ChatbotView;
