/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

import { Chatbots } from '@/app/chatbot/ChatbotContainer';
import PaginationView from '@/components/common/Widget/PaginationView';
import { Chatbot_Features } from '@/utils/constant';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/joy/Avatar';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

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
                <MenuItem>分享</MenuItem>
                <MenuItem>編輯資料</MenuItem>
                <MenuItem>編輯輔助問題</MenuItem>
                <Divider />
                <MenuItem color="danger">刪除</MenuItem>
            </Menu>
        </Dropdown>
    );
}

interface ViewProps {
    chatbots: Chatbots[];
    meta: any;
}

export default function ChatbotTable(props: ViewProps) {
    const { chatbots, meta } = props;

    React.useEffect(() => {
        console.log('chatbots', chatbots);
    }, []);

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
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1
                }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' }
                    }
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for assistant</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                </FormControl>
                {/* {renderFilters()} */}
            </Box>
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
                                                <Typography level="body-sm">
                                                    <Link
                                                        level="title-sm"
                                                        href={`/chatbot/${row.chatbot.id}`}
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'black'
                                                        }}
                                                    >
                                                        {row.chatbot.name}
                                                    </Link>
                                                    {getFeatureNames(
                                                        row.chatbot.meta?.selected_features
                                                    )?.map((name, index) => (
                                                        <Typography
                                                            key={index}
                                                            variant="soft"
                                                            color="primary"
                                                            fontSize="xs"
                                                            sx={{ marginLeft: 1 }}
                                                        >
                                                            {name}
                                                        </Typography>
                                                    ))}
                                                </Typography>
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
                                            <RowMenu />
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
