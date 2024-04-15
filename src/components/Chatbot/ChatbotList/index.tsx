/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';

import { Chatbots } from '@/app/chatbot/ChatbotContainer';
import PaginationView from '@/components/common/Widget/PaginationView';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import moment from 'moment';

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move</MenuItem>
                <Divider />
                <MenuItem color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}

interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
}

export default function ChatbotList(props: ViewProps) {
    const { chatbots, meta } = props;
    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            {chatbots.map((listItem) => (
                <List
                    key={listItem.chatbot.id}
                    size="sm"
                    sx={{
                        '--ListItem-paddingX': 0
                    }}
                >
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start'
                        }}
                    >
                        <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                            <ListItemDecorator>
                                <Avatar size="sm">{listItem.chatbot.name.substring(0, 1)}</Avatar>
                            </ListItemDecorator>
                            <div>
                                <Typography fontWeight={600} gutterBottom>
                                    {listItem.chatbot.name}
                                </Typography>
                                <Typography level="body-xs" gutterBottom>
                                    {listItem.chatbot.description}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0.5,
                                        mb: 1
                                    }}
                                >
                                    <Typography level="body-xs">
                                        {moment(listItem.chatbot?.updated_at).format(
                                            'YYYY-MM-DD HH:mm'
                                        )}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <RowMenu />
                                </Box>
                            </div>
                        </ListItemContent>
                    </ListItem>
                    <ListDivider />
                </List>
            ))}
            <Box
                className="Pagination-mobile"
                sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
            >
                <PaginationView meta={meta} pathname={'/chatbot'} params={null} />
            </Box>
        </Box>
    );
}
