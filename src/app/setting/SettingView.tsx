import { Box, Breadcrumbs, Link, Typography, Chip } from '@mui/joy';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Button from '@mui/joy/Button';

import { ShowCurrentUser } from './SettingContainer';
import Profile from '../../components/setting/Profile';
import ChangePassword from '../../components/setting/ChangePassword';
import Gmail from '../../components/setting/Gmail';
import { signIn, signOut } from 'next-auth/react';
import { useSession, SessionProvider } from 'next-auth/react';


interface SettingViewProps {
    currentUserData: ShowCurrentUser | undefined;
    currentUserLoading: boolean;
    session?: any | null;
}
export default function SettingView({
    currentUserData,
    currentUserLoading,
    session
}: SettingViewProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
                component="main"
                className="MainContent"
                sx={{
                    px: { xs: 2, md: 6 },
                    pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        sm: 'calc(12px + var(--Header-height))',
                        md: 3
                    },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    gap: 1
                }}
            >
                <Tabs defaultValue="profile" sx={{ bgcolor: 'transparent' }}>
                    <TabList
                        underlinePlacement="bottom"
                        size="sm"
                        sx={{
                            display: 'flex',
                            pl: { xs: 0, md: 4 },
                            justifyContent: 'left',
                            [`&& .${tabClasses.root}`]: {
                                fontWeight: '600',
                                flex: 'initial',
                                color: 'text.tertiary',
                                [`&.${tabClasses.selected}`]: {
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&::after': {
                                        height: '2px',
                                        bgcolor: 'primary.500'
                                    }
                                }
                            }
                        }}
                    >
                        <Tab value="profile" indicatorInset
                            indicatorPlacement="bottom"
                            sx={{ borderRadius: '6px 6px 0 0' }}
                        >
                            帳戶
                        </Tab>
                        <Tab value="change_password" indicatorInset
                            indicatorPlacement="bottom"
                            sx={{ borderRadius: '6px 6px 0 0' }}
                        >
                            更改密碼
                        </Tab>
                        <Tab value="gmail" indicatorInset
                            indicatorPlacement="bottom"
                            sx={{ borderRadius: '6px 6px 0 0' }}
                        >
                            連結你的外部電子郵件
                        </Tab>
                    </TabList>
                    <TabPanel value="profile">
                        <Profile {...{ currentUserData, currentUserLoading }} />
                    </TabPanel>
                    <TabPanel value="change_password">
                        <ChangePassword />
                    </TabPanel>
                    <TabPanel value="gmail">
                        <Gmail/>
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>
    );
}
