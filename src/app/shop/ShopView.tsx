import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input, Card } from '@mui/joy';
import ShopRow from '../../components/shop/ShopRow';

interface ViewProps {
    open: boolean;
    setOpen: any;
}
export default function ShopView(props: ViewProps) {
    const { open, setOpen } = props;
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
                        <Typography level="h2" component="h1">商城</Typography>
                    </Box>
                    <Typography level="title-md">Recommended LLM Functions</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, maxWidth: '80rem' }}>
                        <ShopRow
                            title={'CHYB_日常_撰寫Report'}
                            description={'報告內容大綱'}
                            price={'10'}
                        />
                        <ShopRow
                            title={'GenCF_Email Writer'}
                            description={
                                'Reply to an email or write an email to your designated personnel'
                            }
                            price={'11'}
                        />
                        <ShopRow
                            title={'CHYB_日常_文件翻譯'}
                            description={' 日常_文件翻譯...'}
                            price={'5'}
                        />
                        <ShopRow
                            title={'CHYB_日常_構思SOP大綱'}
                            description={'工作流程或過程描述 '}
                            price={'6'}
                        />
                        <ShopRow
                            title={"CHYB_Handling Customer's Complaints"}
                            description={" CHYB_Handling Customer's Complaints..."}
                            price={'10'}
                        />
                        <ShopRow
                            title={'General_Bookkeeping'}
                            description={' General_Bookkeeping...'}
                            price={'20'}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
