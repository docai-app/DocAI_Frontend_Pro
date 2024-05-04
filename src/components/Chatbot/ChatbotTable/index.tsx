'use client';

import { Chatbots } from '@/app/chatbot/ChatbotContainer';
import PaginationView from '@/components/common/Widget/PaginationView';
import { Chatbot_Features } from '@/utils/constant';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { Chip, Stack } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import { iconButtonClasses } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import LoaderView from '../LoaderView';
import Dropdowns from '../feature/Dropdowns';

interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
    handleDeleteChatbot: any;
    handleShare: any;
}

export default function ChatbotTable(props: ViewProps) {
    const { chatbots, meta, handleDeleteChatbot, handleShare } = props;
    const router = useRouter();

    const getFeatureNames = (selected_features: any) => {
        if (!selected_features) return [];
        return Chatbot_Features.filter((feature) => selected_features.includes(feature.value)).map(
            (feature) => feature.name
        );
    };
    return (
        <React.Fragment>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    padding: 2,
                    minHeight: 0
                }}
            >
                <Box>
                    {chatbots.length == 0 ? (
                        <LoaderView />
                    ) : null}
                    {chatbots.map((row, index) => (
                        <Box key={index}>
                            <List
                                key={row.chatbot.id}
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
                                    <ListItemContent
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'start',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <ListItemDecorator>
                                                <Avatar size="sm">
                                                    {row.chatbot.name.substring(0, 1)}
                                                </Avatar>
                                            </ListItemDecorator>
                                            <div>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Typography level="body-sm">
                                                        <Link
                                                            level="title-sm"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                color: 'black'
                                                            }}
                                                        >
                                                            <Typography
                                                                onClick={() => {
                                                                    handleShare(row.chatbot, true);
                                                                }}
                                                            >
                                                                {row.chatbot.name}
                                                            </Typography>
                                                        </Link>
                                                    </Typography>
                                                    <Stack direction="row" spacing={1}>
                                                        {getFeatureNames(
                                                            row.chatbot.meta?.selected_features
                                                        )?.map((name, index) => (
                                                            <Chip
                                                                key={index}
                                                                color="primary"
                                                                variant="soft"
                                                                size="sm"
                                                            >
                                                                {name}
                                                            </Chip>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                                <Typography level="body-xs" gutterBottom>
                                                    {row.chatbot.description}
                                                </Typography>
                                            </div>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                mb: 1
                                            }}
                                        >
                                            <Chip
                                                variant="soft"
                                                startDecorator={<PollOutlinedIcon />}
                                                onClick={() => {
                                                    router.push('/chatbot/data');
                                                }}
                                            >
                                                {'View Data'}
                                            </Chip>
                                            <Dropdowns
                                                share={() => {
                                                    handleShare(row.chatbot);
                                                }}
                                                edit={() => {
                                                    router.push(
                                                        `/chatbot/edit?id=${row.chatbot?.id}`
                                                    );
                                                }}
                                                editQuesion={() => {
                                                    router.push(
                                                        `/chatbot/${row.chatbot?.id}/assistive_question`
                                                    );
                                                }}
                                                remove={() => {
                                                    handleDeleteChatbot(row.chatbot);
                                                }}
                                            />
                                        </Box>
                                    </ListItemContent>
                                </ListItem>
                                <ListDivider />
                            </List>
                        </Box>
                    ))}
                </Box>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}
            >
                <PaginationView meta={meta} pathname={'/chatbot'} params={null} />
            </Box>
        </React.Fragment>
    );
}
