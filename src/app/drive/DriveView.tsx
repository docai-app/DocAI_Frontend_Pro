import { Box, Breadcrumbs, Link, Typography, Chip } from '@mui/joy';
import DriveTable from '../../components/DriveLayout/DriveTable';
import LabelManagement from '../../components/DriveLayout/LabelManagement';
import Button from '@mui/joy/Button';
import Accordion from '@mui/joy/Accordion';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Add from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface ViewProps {
    data: any;
}

function DriveView(props: ViewProps) {
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
                        height: '100dvh',
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            mr: 3,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon />}
                            sx={{ pl: 0 }}
                        >
                            <Link underline="none" color="neutral" href="/" aria-label="Home">
                                <HomeRoundedIcon />
                            </Link>
                            <Typography color="primary" fontWeight={500} fontSize={12}>
                                Drive
                            </Typography>
                        </Breadcrumbs>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 2
                            }}>
                            <Link
                                color="primary"
                                underline='always'
                            // href={ }
                            >
                                智能文檔處理
                            </Link>
                            <Typography level="h2">文件倉庫</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                        <Typography level="title-md">Root</Typography>
                        <Button
                            color="primary"
                            startDecorator={<Add />}
                            endDecorator={<KeyboardDoubleArrowDownIcon />}

                        >新增按钮</Button>
                    </Box>


                    <DriveTable />
                    <LabelManagement />

                    {/* <Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography>标签</Typography>
                            <Typography>标签管理</Typography>
                        </Box>
                        <Box>
                            <Chip >一堆标签</Chip><Typography>查看更多</Typography>
                        </Box>
                        <Typography level="h4">一个Search输入框</Typography>
                    </Box> */}

                </Box>
            </Box>
        </>
    );
}

export default DriveView;
