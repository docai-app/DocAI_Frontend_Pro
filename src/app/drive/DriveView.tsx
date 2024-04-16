import { Box, Breadcrumbs, Link, Typography, Chip } from '@mui/joy';
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import Router from 'next/navigation';
import { Folder } from '../../components/common/Widget/FolderTree';
import DriveTable from '../../components/DriveLayout/DriveTable';
import LabelManagement from '../../components/DriveLayout/LabelManagement';
import Button from '@mui/joy/Button';
import Accordion from '@mui/joy/Accordion';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Add from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface DriveViewProps {
    id: string | string[] | null | undefined;
    name: string | string[] | null | undefined;
    showAllItemsData: any;
    showAllItemsLoading: boolean;
    mode: 'view' | 'move' | 'share' | 'newFolder';
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    target: any[];
    setTarget: Dispatch<SetStateAction<any[]>>;
    dest: Folder | null;
    setDest: Dispatch<SetStateAction<Folder | null>>;
    shareWith: any[];
    setShareWith: Dispatch<SetStateAction<any[]>>;
    handleShare: (id: string, user_email: string) => void;
    handleNewFolder: (name: string) => Promise<void>;
    countDocumentsByDateData: any;
    current: any;
    setCurrent: any;
    visableRename: boolean;
    setVisableRename: any;
    updateFolderOrDocumentHandler: any;
    deleteFolderOrDocumentHandler: any;
    visableDelete: boolean;
    setVisableDelete: any;
    allItemsData: any;
    allFoldersItemsData: any;
    showAllItemsHandler: any;
    documents_items: any;
    setDocumentsItems: any;
    folders_items: any;
    setFoldersItems: any;
    handleMoveItems: any;
    handleDeleteItems: any;
    handleDownloadItemsAndFolders: any;
    getAllLabelsData: any;
    search: any;
    confirmDocumentFormik?: any;
    addNewLabelHandler?: any;
    newLabelName: string;
    setNewLabelName: any;
    updateTag: boolean;
    setUpdateTag: any;
    schemasStatusReadyData: any;
    handleDeepUnderstanding: any;
}
export default function DriveView(props: DriveViewProps) {
    const {
        id = null,
        name = 'Root',
        showAllItemsData = null,
        showAllItemsLoading = null,
        mode = 'view',
        setMode = () => {},
        target = [],
        setTarget = () => {},
        dest = null,
        setDest = () => {},
        shareWith = [],
        setShareWith = () => {},
        handleShare = async () => {},
        handleNewFolder = async () => {},
        countDocumentsByDateData = null,
        current,
        setCurrent,
        visableRename,
        setVisableRename,
        updateFolderOrDocumentHandler,
        visableDelete,
        setVisableDelete,
        deleteFolderOrDocumentHandler,
        allItemsData,
        allFoldersItemsData,
        showAllItemsHandler,
        documents_items,
        setDocumentsItems,
        folders_items,
        setFoldersItems,
        handleMoveItems,
        handleDeleteItems,
        handleDownloadItemsAndFolders,
        getAllLabelsData,
        search,
        confirmDocumentFormik,
        newLabelName,
        setNewLabelName,
        addNewLabelHandler,
        updateTag,
        setUpdateTag,
        schemasStatusReadyData,
        handleDeepUnderstanding
    } = props;

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