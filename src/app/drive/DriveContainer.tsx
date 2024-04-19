'use client';

import { DriveDocument, DriveFolder } from '@/utils/types';
import useAxios from 'axios-hooks';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import { Folder } from '../../components/common/Widget/FolderTree';
import useAlert from '../../hooks/useAlert';
import DriveView from './DriveView';

const apiSetting = new Api();

function DriveContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { setAlert } = useAlert();
    const queryId = useRef(searchParams.get('id'));
    const queryName = useRef(searchParams.get('name'));
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

    const { id } = useParams();
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

    useEffect(() => {
        // if (router.asPath !== router.route) {
        //     queryId.current = router.query.id;
        //     queryName.current = router.query.name;
        //     if (queryId.current) {
        //         // setPage(1);
        //         showAllItems(apiSetting.Drive.showAllFolderItems(queryId.current.toString(), page));
        //     } else {
        //         showAllItems(apiSetting.Drive.showAllRootItems(page));
        //     }
        // } else if (router.asPath == '/') {
        //     showAllItems(apiSetting.Drive.showAllRootItems(page));
        // }
        console.log('id', id);

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
                getAllLabelsData
            }}
        />
    );
}

export default DriveContainer;
