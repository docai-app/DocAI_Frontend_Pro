import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Api from '../../../apis';
import FolderTree, { Folder } from './FolderTree';

interface FolderTreeForSelectProps {
    mode: 'view' | 'move' | string;
    setMode: any;
    // folderPath: Folder | null;
    // setFolderPath: Dispatch<SetStateAction<Folder | null>>;
    dest: Folder | null;
    setDest: Dispatch<SetStateAction<Folder | null>>;
    targetId: string | null;
}

const apiSetting = new Api();
export default function FolderTreeForSelect(props: FolderTreeForSelectProps) {
    const { mode, setMode, dest, setDest, targetId } = props;
    const [_dest, _setDest] = useState<Folder | null>(null);

    const router = useRouter();

    useEffect(() => {
        _setDest(null);
    }, []);

    const handleMove = (document_id: string | null, folder: Folder) => {
        setDest(folder);
        setMode('view');
    };

    // const handleMove = useCallback(
    //     async (document_id: string | null, folder: Folder) => {
    //         setDest(folder);
    //         setMode('view');
    //     },
    //     [router]
    // );

    return (
        <Transition show={mode === 'move'}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                    onClick={() => {
                        setMode('view');
                    }}
                />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="translate ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="translate ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="fixed h-[calc(100vh)] shadow-lg right-0 top-0 pt-10 bg-white w-[28rem] z-50">
                    <div className="w-full h-full flex flex-col">
                        <div className="pt-10 px-10 py-2   flex flex-row items-center justify-between">
                            <h1 className="font-bold text-3xl text-center">選擇儲存路徑</h1>
                            <XCircleIcon
                                className="w-6 h-6"
                                onClick={() => {
                                    setMode('');
                                }}
                            />
                        </div>
                        <div className="pl-2 pr-5 overflow-auto">
                            <FolderTree expanded={true} dest={_dest} setDest={_setDest} />
                        </div>
                        {_dest != null && (
                            <div className="py-5 px-5 flex">
                                <button
                                    className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                    onClick={() => handleMove(targetId, _dest)}
                                >
                                    確認
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
}
