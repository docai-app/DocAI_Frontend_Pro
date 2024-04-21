import { Menu, Transition } from '@headlessui/react';
import { DocumentIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, Square2StackIcon, TableCellsIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import Chip from '@mui/joy/Chip';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface DropdownsProps {
    label: any;
    search: any;
    visibleFromFilling?: boolean;
    from_filling: any;
    approval: any;
    move_execl: any;
}

export default function LabelDropdowns(props: DropdownsProps) {
    const { label, search, visibleFromFilling, from_filling, approval, move_execl } = props;
    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button className=" cursor-pointer">
                    <span className="sr-only">Open options</span>
                    <Chip
                        key={label.id}
                        color="primary"
                        variant="soft"
                        startDecorator={<InsertDriveFileIcon />}
                        slotProps={{ action: { component: 'a' } }}
                    >
                        {label?.name}({label.taggings_count || 0})
                    </Chip>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className=" origin-bottom-left absolute z-10 bottom-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black  divide-y divide-gray-100 ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={search}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <MagnifyingGlassIcon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    搜尋文檔
                                </a>
                            )}
                        </Menu.Item>
                        {visibleFromFilling && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={from_filling}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <TableCellsIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        AI輔助填表
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={approval}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <ShieldCheckIcon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    審批
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={move_execl}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <Square2StackIcon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    搬資料到Execl
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
