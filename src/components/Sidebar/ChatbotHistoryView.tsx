import { ListDivider, ListItemButton, ListItemContent, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import moment from 'moment';

export default function ChatbotHistoryView() {
    return (
        <>
            <List>
                <ListItem
                    sx={{
                        p: 0
                    }}
                >
                    <ListItemButton>
                        <ListItemContent>
                            <Typography noWrap fontSize={14}>
                                聊天吧...
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '10px'
                                }}
                            >
                                {moment('2024-04-04 10:10').fromNow()}
                            </Typography>
                        </ListItemContent>
                    </ListItemButton>
                </ListItem>
                <ListDivider />
            </List>
        </>
    );
}
