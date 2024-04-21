import BreadCrumb from '@/components/drive/BreadCrumb';
import { DriveDocument, DriveFolder } from '@/utils/types';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import { useRouter } from 'next/navigation';
import {
    Dispatch, SetStateAction,
    useCallback, useState
} from 'react';

import AmendLabel from '../../components/classification/AmendLabel';
import { Folder } from '../../components/common/Widget/FolderTree';
import FolderTreeForMoving from '../../components/common/Widget/FolderTreeForMoving';
import InputNameModal from '../../components/common/Widget/InputNameModal';
import MyModal from '../../components/common/Widget/MyModal';
import DriveTable from '../../components/drive/DriveTable';
import EditItems from '../../components/drive/EditItems';
import SearchLabelDocumentForm from '../../components/drive/SearchLabelDocumentForm';
import SelectDataSchemaModal from '../../components/Search/SelectDataSchemaModal';

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
    dest: Folder | null;
    setDest: Dispatch<SetStateAction<Folder | null>>;
    visableRename: boolean;
    setVisableRename: any;
    visableDelete: boolean;
    setVisableDelete: any;
    current: any;
    setCurrent: any;
    updateFolderOrDocumentHandler: any;
    deleteFolderOrDocumentHandler: any;
    documents_items: any;
    setDocumentsItems: any;
    folders_items: any;
    setFoldersItems: any;
    handleMoveItems: any;
    handleDeleteItems: any;
    handleDownloadItemsAndFolders: any;
    confirmDocumentFormik?: any;
    showAllItemsHandler: any;
    showAllDriveLoading: boolean;

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
        dest = null,
        setDest = () => { },
        visableRename,
        setVisableRename,
        visableDelete,
        setVisableDelete,
        current,
        setCurrent,
        updateFolderOrDocumentHandler,
        deleteFolderOrDocumentHandler,
        documents_items,
        setDocumentsItems,
        folders_items,
        setFoldersItems,
        handleMoveItems,
        handleDeleteItems,
        handleDownloadItemsAndFolders,
        confirmDocumentFormik,
        showAllItemsHandler,
        showAllDriveLoading
    } = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openSelectShema, setOpenSelectShema] = useState(false);
    const [openEditLabel, setOpenEditLabel] = useState(false);

    const clearCheckedData = useCallback(() => {
        setFoldersItems([]);
        setDocumentsItems([]);
    }, [setFoldersItems, setDocumentsItems]);

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
            <EditItems
                moveItems={() => {
                    setCurrent({ type: 'moveItems' });
                    setMode('move');
                }}
                visibleUpdateTag={documents_items?.length > 0 && folders_items?.length == 0}
                updateTag={() => {
                    setOpen(true);
                }}
                clearItems={() => {
                    clearCheckedData();
                }}
                deleteItems={() => {
                    handleDeleteItems();
                }}
                downloadItems={() => {
                    handleDownloadItemsAndFolders();
                }}
                visibleToExecl={documents_items?.length > 0 && folders_items?.length == 0}
                toExecl={() => {
                    setOpenSelectShema(true);
                }}
                visibleOpen={documents_items?.length == 1 && folders_items?.length == 0}
                openItems={() => {
                    router.push(`/document/chat?document_ids=${documents_items[0]}`);
                }}
                count={documents_items?.length + folders_items?.length}
            />
            <AmendLabel
                open={open}
                setOpen={setOpen}
                allLabelsData={getAllLabelsData}
                confirmDocumentFormik={confirmDocumentFormik}
                isSubmit={true}
                setTagName={(name: string) => { }}
                setOpenEditLabel={setOpenEditLabel}
            />
            <SelectDataSchemaModal
                open={openSelectShema}
                setOpen={setOpenSelectShema}
                document_ids={[documents_items]}
            />
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
                        folders_items,
                        documents_items,
                        setFoldersItems,
                        setDocumentsItems,
                        showAllItemsHandler,
                        allDrivesData,
                        showAllDriveLoading
                    }}
                />
                <SearchLabelDocumentForm getAllLabelsData={getAllLabelsData} search={undefined} />
                <InputNameModal
                    visable={visableRename}
                    current={current}
                    setCurrent={setCurrent}
                    description={`輸入新的名稱`}
                    cancelClick={() => {
                        setVisableRename(false);
                    }}
                    confirmClick={() => {
                        setVisableRename(false);
                        updateFolderOrDocumentHandler();
                    }}
                />
                <FolderTreeForMoving
                    {...{
                        mode,
                        setMode,
                        dest,
                        setDest,
                        targetId: target?.[0]?.id,
                        current,
                        handleMoveItems
                    }}
                />
                <MyModal
                    visable={visableDelete}
                    description={`是否刪除"${current?.name}"?`}
                    cancelClick={() => {
                        setVisableDelete(false);
                    }}
                    confirmClick={() => {
                        setVisableDelete(false);
                        deleteFolderOrDocumentHandler();
                    }}
                />
            </Box>
        </>
    );
}
