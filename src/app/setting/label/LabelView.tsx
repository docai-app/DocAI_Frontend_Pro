import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import LabelTable from '../../../components/OrderTable/LabelTable';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

interface ViewProps {
    data: any;
}

function LabelView(props: ViewProps) {
    return (
        <>
            {/* <CssVarsProvider disableTransitionOnChange>
                <CssBaseline /> */}
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
                        height: '100dvh',
                        gap: 1
                    }}
                >
                    {/* <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Link underline="none" color="neutral" href="/" aria-label="Home">
                            <HomeRoundedIcon />
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            Label
                        </Typography>
                    </Breadcrumbs> */}

                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button
                            color="primary"
                            variant="plain"
                            // startDecorator={<Add />}
                        >
                            返回
                        </Button>
                        <Typography level="h2" component="h1">
                            標籤管理
                        </Typography>
                        <Button
                            color="primary"
                            // startDecorator={<DownloadRoundedIcon />}
                            size="sm"
                        >
                            新增
                        </Button>
                    </Box>

                    <LabelTable />

                    <Typography level="h3">待查核標籤</Typography>
                    <LabelTable />
                </Box>
            </Box>
            {/* </CssVarsProvider> */}
        </>
    );
}

export default LabelView;
