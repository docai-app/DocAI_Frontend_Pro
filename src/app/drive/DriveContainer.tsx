'use client';

import { DriveDocument, DriveFolder } from '@/utils/types';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import { Folder } from '../../components/common/Widget/FolderTree';
import useAlert from '../../hooks/useAlert';
import DriveView from './DriveView';

const apiSetting = new Api();

function DriveContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { paramId } = useParams();
    const { setAlert } = useAlert();
    const queryId = useRef(searchParams.get('id'));
    const queryName = useRef(searchParams.get('name'));
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [mode, setMode] = useState<'view' | 'move' | 'share' | 'newFolder'>('view');
    const [target, setTarget] = useState<any[]>([]);
    const [shareWith, setShareWith] = useState<any[]>([]);
    const [newFolderName, setNewFolderName] = useState<string | null>(null);
    const [dest, setDest] = useState<Folder | null>(null);
    const [visableDelete, setVisableDelete] = useState(false);
    const [visableRename, setVisableRename] = useState(false);
    const [current, setCurrent] = useState<any>();
    const [allItemsData, setAllItemsData] = useState<any>([]);
    const [allFoldersItemsData, setAllFoldersItemsData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [documents_items, setDocumentsItems] = useState<any>([]);
    const [folders_items, setFoldersItems] = useState<any>([]);
    const [newLabelName, setNewLabelName] = useState('');
    const [updateTag, setUpdateTag] = useState(false);
    const [documents, setDocuments] = useState<DriveDocument[]>([]);
    const [folders, setFolders] = useState<DriveFolder[]>([]);

    const [
        { data: allDrivesData, loading: showAllDriveLoading, error: showAllDriveError },
        showAllDrives
    ] = useAxios({}, { manual: true });

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems] = useAxios({}, { manual: true });
    const [{ data: updateFolderNameData }, updateFolderName] = useAxios({}, { manual: true });
    const [{ data: updateDocumentByIdData }, updateDocumentById] = useAxios({}, { manual: true });
    const [{ data: deleteFolderByIdData }, deleteFolderById] = useAxios({}, { manual: true });
    const [{ data: deleteDocumentByIdData }, deleteDocumentById] = useAxios({}, { manual: true });
    const [{ data: updateDocumentTagData }, updateDocumentTag] = useAxios(
        apiSetting.Classification.updateDocumentTag([], ''),
        { manual: true }
    );
    const [{ data: moveItemsToSpecificFolderData }, moveItemsToSpecificFolder] = useAxios(
        apiSetting.Drive.moveItemsToSpecificFolder(),
        { manual: true }
    );
    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Tag.addNewTag(),
        { manual: true }
    );


    const handleMoveItems = async (target_folder_id: string | null) => {
        if (target_folder_id != null) {
            const formData = new FormData();
            for (const i of documents_items) {
                formData.append('document_items[]', i);
            }
            for (const i of folders_items) {
                formData.append('folder_items[]', i);
            }
            if (target_folder_id) {
                formData.append('target_folder_id', target_folder_id);
            }
            if (paramId) {
                formData.append('current_folder_id', id + '');
            }
            moveItemsToSpecificFolder({
                data: formData
            });
        }
    };
    const handleDeleteItems = async () => {
        const formData = new FormData();
        for (const i of documents_items) {
            formData.append('document_items[]', i);
        }
        for (const i of folders_items) {
            formData.append('folder_items[]', i);
        }
    };

    const handleDownloadItemsAndFolders = useCallback(async () => {
        const data = {
            folder_ids: folders_items,
            document_ids: documents_items
        };
        const res = await axios.request(apiSetting.Drive.downloadItemsByIDs(data));
        try {
            const dataURL = URL.createObjectURL(res.data);
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'documents.zip';
            a.click();
        } catch { }
    }, [folders_items, documents_items]);

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            setUpdateTag(true);
            const res = await updateDocumentTag({
                data: {
                    document_ids: documents_items,
                    tag_id: values.tag_id
                }
            });
            setUpdateTag(false);
            if (res.data.success === true) {
                setAlert({ title: '更新成功', type: 'success' });
                router.refresh();
            } else {
                setAlert({ title: '更新失敗', type: 'error' });
            }
        }
    });
    const updateFolder = async (id: string, name: string) => {
        if (paramId) {
            const res = await updateFolderName(apiSetting.Folders.updateFoldertNameById(id, name));
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.refresh();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };
    const updateDocument = async (id: string, name: string) => {
        if (id) {
            const res = await updateDocumentById(
                apiSetting.Document.updateDocumentNameById(id, name)
            );
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.refresh();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };
    const updateFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') updateFolder(current?.id, current?.name);
        else updateDocument(current?.id, current?.name);
    }, [current]);

    const deleteFolder = async (id: string) => {
        if (id) {
            const res = await deleteFolderById(apiSetting.Folders.deleteFolderById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.refresh();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };
    const deleteDocument = async (id: string) => {
        if (id) {
            const res = await deleteDocumentById(apiSetting.Document.deleteDocumentById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.refresh();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };
    const deleteFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') deleteFolder(current?.id);
        else deleteDocument(current?.id);
    }, [current]);

    const showAllItemsHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);







    useEffect(() => {
        setName(searchParams.get('name') || null);
        if (id) {
            showAllDrives(apiSetting.Drive.showAllFolderItems(id.toString(), page));
        } else {
            showAllDrives(apiSetting.Drive.showAllRootItems(page));
        }
    }, [router, page]);

    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        if (!showAllItemsLoading && showAllItemsData) {
            setId(queryId.current?.toString() || null);
            setName(queryName.current?.toString() || null);
            if (page == 1) {
                setAllFoldersItemsData(showAllItemsData.folders);
                setAllItemsData(showAllItemsData.documents);
            } else {
                setAllItemsData(allItemsData.concat(showAllItemsData.documents));
            }
        }
    }, [showAllItemsLoading, showAllItemsData]);

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            // setAlert({ title: '新增成功', type: 'success' });
            setNewLabelName('');
            confirmDocumentFormik.setFieldValue('tag_id', addNewLabelData.tag.id);
            confirmDocumentFormik.handleSubmit();
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: '新增失敗！',
                content: `原因：${addNewLabelData.errors.name[0]}`,
                type: 'error'
            });
        }
    }, [addNewLabelData]);

    useEffect(() => {
        if (allDrivesData && allDrivesData.success) {
            setDocuments(allDrivesData?.documents);
            setFolders(allDrivesData?.folders);
        }
    }, [allDrivesData]);

    return (
        <DriveView
            {...{
                id,
                name,
                allDrivesData,
                documents,
                folders,
                getAllLabelsData,
                mode,
                setMode,
                target,
                setTarget,
                dest,
                setDest,
                current,
                setCurrent,
                visableRename,
                setVisableRename,
                visableDelete,
                setVisableDelete,
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
                showAllItemsData,
                showAllItemsLoading,
            }}
        />
    );
}

export default DriveContainer;
