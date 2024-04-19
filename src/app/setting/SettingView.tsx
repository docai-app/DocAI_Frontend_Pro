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
                        {/* <div className="flex flex-col rounded-2xl bg-gray-100 px-12 py-6 border">
                <div className="flex flex-col">
                    <h2 className="text-slate-900 font-bold text-xl mb-6">連結你的外部電子郵件</h2>
                    <label className="flex flex-col gap-2">
                        <div>Gmail</div>
                        {session ? (
                            <a href="#" className="group block flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                                className="inline-block h-9 w-9 rounded-full"
                                                src={(session?.user?.image as string) || ''}
                                                alt={session?.user?.name}
                                            />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {session?.user?.name}{' '}
                                            <span className="text-xs text-gray-500">
                                                {session?.user?.email}
                                            </span>
                                        </p>
                                        <p
                                            className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                                            onClick={() => signOut()}
                                        >
                                            Sign out
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <button
                                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    signIn('google', { params: { access_type: 'offline' } });
                                }}
                            >
                                Connect Your Google Email
                            </button>
                        )}
                    </label>
                </div>
            </div> */}
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>
    );
}
