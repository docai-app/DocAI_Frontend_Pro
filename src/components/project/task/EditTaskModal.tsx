/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import moment from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react';
import useAlert from '../../../hooks/useAlert';
export default function EditTaskModal(props: any) {
    const cancelButtonRef = useRef(null);
    const refTitle = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();
    const [data, setData] = useState({
        id: null,
        name: '',
        description: '',
        deadline: '',
        assignee_id: '',
        dag_meta: {
            dag_id: '',
            dag_name: ''
        }
    });

    useEffect(() => {
        setTimeout(() => {
            if (refTitle.current) refTitle.current?.focus();
        }, 100);

        if (props.task != null) {
            setData({
                ...data,
                id: props.task.id,
                name: props.task.name,
                description: props.task.description,
                deadline: props.task.deadline,
                assignee_id: props.task.assignee_id,
                dag_meta: props.task.dag_meta
            });
        } else {
            setData({
                ...data,
                id: null,
                name: '',
                description: '',
                deadline: '',
                assignee_id: '',
                dag_meta: {
                    dag_id: '',
                    dag_name: ''
                }
            });
        }
    }, [props]);

    const validate = () => {
        if (!data.name) return setAlert({ title: '請輸入名稱', type: 'info' });
        if (!data.deadline) return setAlert({ title: '請輸入截止時間', type: 'info' });
        // if (!data.assignee_id) return setAlert({ title: '請選擇負責人', type: 'info' });
        setData({
            ...data,
            id: null,
            name: '',
            description: '',
            deadline: '',
            assignee_id: '',
            dag_meta: {
                dag_id: '',
                dag_name: ''
            }
        });
        props.confirmClick(data);
    };

    const getChainFeatureBlocks = (chain_feature: any) => {
        const inputs = JSON.parse(chain_feature['input']);
        const loaders = JSON.parse(chain_feature['loader']);
        // console.log(JSON.parse(chain_feature['input']));
        // console.log(inputs);
        // console.log(loaders);
        const blocks: any = [];
        inputs?.map((block: any) => {
            block.datas?.map((data: any) => {
                blocks.push(data);
            });
        });
        loaders?.map((block: any) => {
            block.datas?.map((data: any) => {
                blocks.push(data);
            });
        });
        console.log('blocks', blocks);
    };

    const getChainFeatureName = (dag_id: string) => {
        if (!dag_id) return;
        const chain_feature = _.find(props.chain_features, function (cf: any) {
            return cf.fields.dag_id == dag_id;
        });
        return chain_feature?.fields?.name;
    };

    return (
        <>
            <Transition.Root show={props.visable || false} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={() => {}}
                >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center   shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="flex flex-row justify-between items-center">
                                    <XMarkIcon
                                        className="w-6 cursor-pointer"
                                        onClick={props.cancelClick}
                                    />
                                    <label>{props?.title}</label>
                                    <button
                                        type="button"
                                        className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            validate();
                                        }}
                                    >
                                        完成
                                    </button>
                                </div>
                                <div className="w-full mt-4">
                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500">*</span>名稱:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="text"
                                                autoFocus
                                                ref={refTitle}
                                                placeholder="任務名稱"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                defaultValue={data?.name}
                                                onChange={async (e) => {
                                                    setData({
                                                        ...data,
                                                        name: e.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                描述:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="string"
                                                placeholder="任務描述"
                                                className="appearance-none hidden block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                defaultValue={data?.description}
                                                onChange={async (e) => {
                                                    setData({
                                                        ...data,
                                                        description: e.target.value
                                                    });
                                                }}
                                            />
                                            <textarea
                                                id="type"
                                                placeholder="任務描述"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                defaultValue={data?.description}
                                                onChange={async (e) => {
                                                    setData({
                                                        ...data,
                                                        description: e.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500 hidden">*</span>
                                                負責人:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <select
                                                className="w-full border border-gray-300 rounded-md  "
                                                defaultValue={data?.assignee_id}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        assignee_id: e.target.value
                                                    });
                                                }}
                                            >
                                                <option
                                                    value={''}
                                                    className="w-full border rounded-md text-gray-500 "
                                                >
                                                    請選擇負責人
                                                </option>
                                                {props.users?.map((user: any, index: number) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            className="w-full border rounded-md  "
                                                            value={user.id}
                                                        >
                                                            {user.email}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500 hidden">*</span>
                                                Chain feature:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <select
                                                className="w-full border border-gray-300 rounded-md  "
                                                defaultValue={data?.dag_meta?.dag_id}
                                                onChange={(e) => {
                                                    // console.log(JSON.parse(e.target.value));
                                                    // const chain_feature = JSON.parse(
                                                    //     e.target.value
                                                    // );
                                                    // getChainFeatureBlocks(chain_feature);
                                                    setData({
                                                        ...data,
                                                        dag_meta: {
                                                            dag_id: e.target.value,
                                                            dag_name: getChainFeatureName(
                                                                e.target.value
                                                            )
                                                        }
                                                    });
                                                }}
                                            >
                                                <option
                                                    value={''}
                                                    className="w-full border rounded-md text-gray-500 "
                                                >
                                                    請選擇Chain feature
                                                </option>
                                                {props?.chain_features?.map(
                                                    (item: any, index: number) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                className="w-full border rounded-md  "
                                                                value={item.fields.dag_id}
                                                            >
                                                                {item.fields.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500">*</span> 截止日期:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="date"
                                                defaultValue={moment(data?.deadline).format(
                                                    'YYYY-MM-DD'
                                                )}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={async (e) => {
                                                    setData({
                                                        ...data,
                                                        deadline: e.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
