import { ChatProps } from '@/utils/types';
import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

import ChatsPane from './ChatsPane';
import MessagesPane from './MessagesPane';

interface ViewProps {
    chats: ChatProps[];
    getAllLabelsData: any;
    getAllSchemasData: any;
}
export default function MyProfile(props: ViewProps) {
    const {
        chats,
        getAllLabelsData,
        getAllSchemasData
    } = props;

    const [selectedChat, setSelectedChat] = React.useState<ChatProps>();
    React.useEffect(() => {
        if (chats) {
            setSelectedChat(chats[0])
        }
    }, [chats])
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
                    sm: 'minmax(min-content, min(30%, 400px)) 1fr'
                }
            }}
        >
            <Sheet
                sx={{
                    position: { xs: 'fixed', sm: 'sticky' },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
                        sm: 'none'
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
                    selectedChatId={selectedChat?.id || ''}
                    setSelectedChat={setSelectedChat}
                />
            </Sheet>
            <MessagesPane chat={selectedChat} getAllLabelsData={getAllLabelsData} getAllSchemasData={getAllSchemasData} />
        </Sheet>
    );
}
