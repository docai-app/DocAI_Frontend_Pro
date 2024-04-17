/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

import { Chatbots } from '@/app/chatbot/ChatbotContainer';
import PaginationView from '@/components/common/Widget/PaginationView';
import { Link } from '@mui/joy';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Dropdowns from '../feature/Dropdowns';

interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
    handleDeleteChatbot: any;
    handleShare: any;
}

export default function ChatbotList(props: ViewProps) {
    const { chatbots, meta, handleDeleteChatbot, handleShare } = props;
    const router = useRouter();
    return (
        <>
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
                                    <Avatar size="sm">
                                        {listItem.chatbot.name.substring(0, 1)}
                                    </Avatar>
                                </ListItemDecorator>
                                <div>
                                    <Typography fontWeight={600} gutterBottom>
                                        <Link
                                            level="title-sm"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}
                                        >
                                            <Typography
                                                onClick={() => {
                                                    handleShare(listItem.chatbot, true);
                                                }}
                                            >
                                                {listItem.chatbot.name}
                                            </Typography>
                                        </Link>
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 1
                                        }}
                                    >
                                        <Dropdowns
                                            share={() => {
                                                handleShare(listItem.chatbot);
                                            }}
                                            edit={() => {
                                                router.push(
                                                    `/chatbot/edit?id=${listItem.chatbot?.id}`
                                                );
                                            }}
                                            editQuesion={() => {
                                                router.push(
                                                    `/chatbot/${listItem.chatbot?.id}/assistive_question`
                                                );
                                            }}
                                            remove={() => {
                                                handleDeleteChatbot(listItem.chatbot);
                                            }}
                                        />
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
        </>
    );
}
