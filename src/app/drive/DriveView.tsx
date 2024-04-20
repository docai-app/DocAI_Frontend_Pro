import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import DriveTable from '../../components/drive/DriveTable';
import SearchLabelDocumentForm from '../../components/drive/SearchLabelDocumentForm';
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';

import BreadCrumb from '@/components/drive/BreadCrumb';
import { DriveDocument, DriveFolder } from '@/utils/types';
import Add from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface DriveViewProps {
    id: any;
    name: string | null;
    allDrivesData: any;
    documents: DriveDocument[];
    folders: DriveFolder[];
    getAllLabelsData: any;
    mode: 'view' | 'move' | 'share' | 'newFolder';
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    target: any[];
    setTarget: Dispatch<SetStateAction<any[]>>;
    visableRename: boolean;
    setVisableRename: any;
    visableDelete: boolean;
    setVisableDelete: any;
    current: any;
    setCurrent: any;
}
export default function DriveView(props: DriveViewProps) {
    const {
        id = null,
        name = 'Root',
        allDrivesData,
        documents,
        folders,
        getAllLabelsData,
        mode = 'view',
        setMode = () => { },
        target = [],
        setTarget = () => { },
        visableRename,
        setVisableRename,
        visableDelete,
        setVisableDelete,
        current,
        setCurrent,
    } = props;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        文件倉庫
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography level="h2" component="h1">
                    文件倉庫
                </Typography>
            </Box>

            <Box
                sx={{
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
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'start', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {allDrivesData && (
                            <BreadCrumb
                                ancestors={allDrivesData?.ancestors}
                                id={id?.toString()}
                                name={name?.toString()}
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 1,
                            width: '20%'
                        }}
                    >
                        {/* <Link fontWeight={500} fontSize={12} color="primary" underline="always">
                                智能文檔處理
                            </Link> */}
                        <Button
                            size="sm"
                            color="primary"
                            startDecorator={<Add />}
                            endDecorator={<KeyboardDoubleArrowDownIcon />}
                        >
                            新增
                        </Button>
                    </Box>
                </Box>

                <DriveTable
                    {...{
                        documents,
                        folders,
                        handleSelectedValue: () => { },
                        setMode,
                        setTarget,
                        setVisableRename,
                        setVisableDelete,
                        setCurrent,
                    }}
                />

                <SearchLabelDocumentForm getAllLabelsData={getAllLabelsData} search={undefined} />
            </Box>
        </>
    );
}
