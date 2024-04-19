import Add from '@mui/icons-material/Add';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SmsIcon from '@mui/icons-material/Sms';
import SourceIcon from '@mui/icons-material/Source';
import { Button, ListSubheader } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

import { closeSidebar } from '../../utils/utils';
import LogoutButton from '../common/Widget/buttons/LogoutButton';
import ChatbotHistoryView from './ChatbotHistoryView';

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden'
                    }
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const [email, setEmail] = React.useState<string>('');

    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
    }, []);

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none'
                },
                transition: 'transform 0.4s, width 0.4s',
                // zIndex: 10000,
                zIndex: 0,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px'
                        }
                    }
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)'
                    }
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRoundedIcon />
                </IconButton>
                <Typography level="title-lg">DocAI</Typography>
                {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
            </Box>
            {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5
                    }
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm
                    }}
                >
                    <ListItem>
                        <ListItemButton
                            selected={pathname == '/' || pathname == '/home'}
                            component="a"
                            href="/"
                        >
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton
                            component="a"
                            href="/search"
                            selected={pathname.indexOf('/search') != -1}
                        >
                            <SourceIcon />
                            <ListItemContent>
                                <Typography level="title-sm">文件</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            component="a"
                            href="/setting/label"
                            selected={pathname.indexOf('/setting/label') != -1}
                        >
                            <LocalOfferIcon />
                            <ListItemContent>
                                <Typography level="title-sm">標簽</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="/chatbot"
                            selected={pathname.indexOf('/chatbot') != -1}
                        >
                            <SmsIcon />
                            <ListItemContent>
                                <Typography level="title-sm">助手</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton
                            selected={pathname.indexOf('/shop') != -1}
                            component="a"
                            href="/shop"
                        >
                            <ShoppingCartRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">商城</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="/project"
                            selected={pathname.indexOf('/project') != -1}
                        >
                            <QuestionAnswerRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">待辦事項</Typography>
                            </ListItemContent>
                            <Chip size="sm" color="primary" variant="solid">
                                4
                            </Chip>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <GroupRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">example</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        role="menuitem"
                                        component="a"
                                        href="/drive-example"
                                    >
                                        drive-example
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        role="menuitem"
                                        component="a"
                                        href="/profile-example"
                                    >
                                        profile-example
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton component="a" href="/sign-in-example">
                                        sign-in-example
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton component="a" href="/order-example">
                                        order-example
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                    <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                        Chatbot
                    </ListSubheader>
                    <Button component="a" href="/chat" startDecorator={<Add />} size="sm">
                        新增聊天
                    </Button>
                    <ChatbotHistoryView />
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="body-sm">{email}</Typography>
                </Box>
                <LogoutButton />
            </Box>
        </Sheet>
    );
}
