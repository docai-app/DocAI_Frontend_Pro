import { ChatProps, MessageProps, UserProps } from '@/utils/types';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import moment from 'moment';
import * as React from 'react';
import AvatarWithStatus from './AvatarWithStatus';
import { toggleMessagesPane } from './utils';

type ChatListItemProps = ListItemButtonProps & {
    id: string;
    unread?: boolean;
    sender: UserProps;
    messages: MessageProps[];
    selectedChatId?: string;
    setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem(props: ChatListItemProps) {
    const { id, sender, messages, selectedChatId, setSelectedChat } = props;
    const selected = selectedChatId === id;
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        toggleMessagesPane();
                        setSelectedChat({ id, sender, messages });
                    }}
                    selected={selected}
                    color="neutral"
                    sx={{
                        flexDirection: 'column',
                        alignItems: 'initial',
                        gap: 1
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        <AvatarWithStatus online={sender.online} src={sender.avatar} />
                        <Box sx={{ flex: 1 }}>
                            <Typography level="title-sm">{sender.name}</Typography>
                            <Typography level="body-sm">{sender.source?.name}</Typography>
                            <Box
                                sx={{
                                    lineHeight: 1.5,
                                    textAlign: 'left'
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    display={{ xs: 'none', md: 'block' }}
                                    noWrap
                                >
                                    {moment(
                                        (messages.length > 0 &&
                                            messages[messages.length - 1] &&
                                            messages[messages.length - 1].created_at) ||
                                        moment()
                                    ).fromNow()}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Typography
                        level="body-sm"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {(messages.length > 0 &&
                            messages[messages.length - 1] &&
                            messages[messages.length - 1].content) ||
                            ''}
                    </Typography>
                </ListItemButton>
            </ListItem>
            <ListDivider sx={{ margin: 0 }} />
        </React.Fragment>
    );
}
