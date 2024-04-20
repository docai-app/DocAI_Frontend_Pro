import MyMessages from '@/components/Chat/MyMessages';
import { Box } from '@mui/joy';
interface ViewProps {
    chats: any;
    getAllLabelsData: any;
    getAllSchemasData: any;
    handleAddChat: any;
}

function ChatView(props: ViewProps) {
    const { chats, getAllLabelsData, getAllSchemasData, handleAddChat } = props;

    return (
        <>
            <Box component="main" className="MainContent">
                <MyMessages
                    chats={chats}
                    getAllLabelsData={getAllLabelsData}
                    getAllSchemasData={getAllSchemasData}
                    handleAddChat={handleAddChat}
                />
            </Box>
        </>
    );
}

export default ChatView;
