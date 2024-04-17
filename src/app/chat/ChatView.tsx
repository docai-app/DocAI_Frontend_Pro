import MyMessages from '@/components/Chat/MyMessages';
import { Box } from '@mui/joy';

interface ViewProps {
    data: any;
}

function ChatView(props: ViewProps) {
    return (
        <>
            <Box component="main" className="MainContent" >
                <MyMessages />
            </Box>
        </>
    );
}

export default ChatView;
