import MyMessages from '@/components/Chat/MyMessages';
import { Box } from '@mui/joy';
interface ViewProps {
    chats: any;
    handleAddChat: any;
}

function ChatView(props: ViewProps) {
    const { chats, handleAddChat } = props;

    return (
        <>
            <Box component="main" className="MainContent">
                <MyMessages chats={chats} handleAddChat={handleAddChat} />
            </Box>
        </>
    );
}

export default ChatView;
