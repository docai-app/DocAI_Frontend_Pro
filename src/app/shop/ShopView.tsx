import { Box, Typography } from '@mui/joy';
import ShopRow from '../../components/shop/ShopRow';

interface ViewProps {
    open: boolean;
    setOpen: any;
    showAllChatbotsData: any;
}
export default function ShopView(props: ViewProps) {
    const { open, setOpen, showAllChatbotsData } = props;
    return (
        <>
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
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography level="h2" component="h1">
                            商城
                        </Typography>
                    </Box>
                    <Typography level="title-md">推薦助手</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, maxWidth: '80rem' }}>
                        {showAllChatbotsData?.chatbots?.map((item: any, index: number) => (
                            <ShopRow
                                key={index}
                                title={item?.chatbot?.name}
                                description={item?.chatbot?.description}
                                price={'Free'}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
