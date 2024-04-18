import { ChatProps } from '@/utils/types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { IconButton } from '@mui/joy';
import List from '@mui/joy/List';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import ChatListItem from './ChatListItem';
import { toggleMessagesPane } from './utils';

type ChatsPaneProps = {
    chats: ChatProps[];
    setSelectedChat: (chat: ChatProps) => void;
    selectedChatId: string;
    handleAddChat: any;
};

export default function ChatsPane(props: ChatsPaneProps) {
    const { chats, setSelectedChat, selectedChatId, handleAddChat } = props;
    return (
        <Sheet
            sx={{
                borderRight: '1px solid',
                borderColor: 'divider',
                height: 'calc(95dvh - var(--Header-height))',
                overflowY: 'auto'
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                p={2}
                pb={1.5}
            >
                <Typography
                    fontSize={{ xs: 'md', md: 'lg' }}
                    component="h1"
                    fontWeight="lg"
                    // endDecorator={
                    //     <Chip
                    //         variant="soft"
                    //         color="primary"
                    //         size="md"
                    //         slotProps={{ root: { component: 'span' } }}
                    //     >
                    //         {chats?.length}
                    //     </Chip>
                    // }
                    sx={{ mr: 'auto' }}
                >
                    Messages
                </Typography>
                <IconButton
                    variant="plain"
                    aria-label="edit"
                    color="neutral"
                    size="sm"
                    sx={{ display: { xs: 'none', sm: 'unset' } }}
                    onClick={handleAddChat}
                >
                    <NotInterestedIcon />
                </IconButton>
                <IconButton
                    variant="plain"
                    aria-label="edit"
                    color="neutral"
                    size="sm"
                    onClick={() => {
                        toggleMessagesPane();
                    }}
                    sx={{ display: { sm: 'none' } }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </Stack>
            <List
                sx={{
                    py: 0,
                    '--ListItem-paddingY': '0.75rem',
                    '--ListItem-paddingX': '1rem'
                }}
            >
                {chats?.map((chat) => (
                    <ChatListItem
                        key={chat.id}
                        {...chat}
                        setSelectedChat={setSelectedChat}
                        selectedChatId={selectedChatId}
                    />
                ))}
            </List>
        </Sheet>
    );
}
