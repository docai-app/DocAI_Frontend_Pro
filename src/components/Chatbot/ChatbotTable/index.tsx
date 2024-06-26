'use client';

import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { iconButtonClasses } from '@mui/joy/IconButton';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

import { Chatbots } from '@/app/chatbot/ChatbotContainer';
import PaginationView from '@/components/common/Widget/PaginationView';
import { Chatbot_Features } from '@/utils/constant';
import { Chip, Stack } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { useRouter } from 'next/navigation';
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
    const [open, setOpen] = React.useState(false);
    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );

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
                {/* <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 240, padding: '12px 6px' }}>
                                名稱
                            </th>
                            <th style={{ width: 260, padding: '12px 6px' }}>描述</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>功能</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>更新日期</th>
                            <th style={{ width: 50, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {chatbots.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <Typography level="body-sm" >
                                        <Link
                                            color="primary"
                                            level="title-sm"
                                            href={`/chatbot/${row.chatbot.id}`}
                                        >
                                            {row.chatbot.name}
                                        </Link>
                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.chatbot.description}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs"  >{getFeatureNames(row.chatbot.meta?.selected_features)}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs"  >{moment(row.chatbot?.updated_at).format('YYYY-MM-DD HH:mm')}</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <RowMenu />
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> */}
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
