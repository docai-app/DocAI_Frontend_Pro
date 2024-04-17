import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

import ChatsPane from './ChatsPane';
import { chats } from './data';
import MessagesPane from './MessagesPane';
import { ChatProps } from './types';

export default function MyProfile() {
    const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
    return (
        <Sheet
            sx={{
                flex: 1,
                width: '100%',
                mx: 'auto',
                pt: { xs: 'var(--Header-height)', sm: 0 },
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'minmax(min-content, min(30%, 400px)) 1fr',
                },
            }}
        >
            <Sheet
                sx={{
                    position: { xs: 'fixed', sm: 'sticky' },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
                        sm: 'none',
                    },
                    transition: 'transform 0.4s, width 0.4s',
                    zIndex: 100,
                    width: '100%',
                    top: 0,
                    display: ''
                }}
            >
                <ChatsPane
                    chats={chats}
                    selectedChatId={selectedChat.id}
                    setSelectedChat={setSelectedChat}
                />
            </Sheet>
            <MessagesPane chat={selectedChat} />
        </Sheet>
    );
}
