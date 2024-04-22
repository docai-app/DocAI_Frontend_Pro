/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ShareModal(props: any) {
    const cancelButtonRef = useRef(null);
    const { mode, newFolderNameInput } = props;
    return (
        <Transition.Root show={mode === 'newFolder'} as={Fragment}>
            <Dialog
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={props.cancelClick}
                initialFocus={cancelButtonRef}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <div className="absolute m-auto w-[28rem] h-44 bg-white rounded-lg shadow-lg top-0 left-0 right-0 bottom-0">
                            <Dialog.Panel className="flex flex-col gap-3 p-5 h-full">
                                <h3 className="text-xl font-bold">新增資料夾</h3>
                                <div className="flex flex-row">
                                    <input
                                        ref={newFolderNameInput}
                                        placeholder="輸入資料夾名稱"
                                        type="text"
                                        onFocus={(e) => e.currentTarget.select()}
                                        className="border px-3 py-2 rounded-l-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full text-sm"
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 self-end mt-auto"
                                    onClick={props.confirmClick}
                                >
                                    新增
                                </button>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
