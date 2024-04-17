import { Box, Breadcrumbs, Link, Typography, Chip } from '@mui/joy';
import { PlusIcon } from '@heroicons/react/24/outline';
import Router, { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Folder } from '../../components/common/Widget/FolderTree';
// import HeaderBreadCrumb from '../../components/common/Widget/HeaderBreadCrumb';
import MyDateDropdown from '../../components/common/Widget/MyDateDropdown';
import PaginationView from '../../components/common/Widget/PaginationView';
import ProjectItem from '../../components/project/ProjectItem';
import StepsListView from '../../components/project/step/StepsListView';
import EditTaskModal from '../../components/project/task/EditTaskModal';

interface ProjectViewProps {
    id: string | string[] | null | undefined;
    projects: any;
    meta: any;
    metaSteps: any;
    currentStatus: string;
    setCurrentStatus: any;
    open: boolean;
    setOpen: any;
    tasks: [];
    setTasks: any;
    addProjectStepHandler: any;
    users: [];
    chain_features: [];
}

function ProjectView(props: ProjectViewProps) {
    const {
        id = null,
        projects = null,
        meta,
        metaSteps,
        setCurrentStatus,
        open,
        setOpen,
        tasks,
        setTasks,
        addProjectStepHandler,
        users,
        chain_features
    } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [visiable, setVisiable] = useState(false);
    const [dest, setDest] = useState<Folder | null>(null);
    const [currentTypeTab, setCurrentTypeTab] = useState<'tasks' | 'project_workflow'>('tasks');
    const statusDatas = [
        {
            name: '全部',
            value: 'all'
        },
        {
            name: '未完成',
            value: 'unfinish'
        },
        {
            name: '完成',
            value: 'finish'
        }
    ];
    const [status, setStatus] = useState(statusDatas[0].name);
    const onSwitchStatus = (status: any) => {
        setStatus(status.name);
        setCurrentStatus(status.value);
    };

    const [mode, setMode] = useState<'add' | 'edit' | ''>('');
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);

    useEffect(() => {
        if (router && searchParams.get('type') == 'project_workflow') {
            setCurrentTypeTab('project_workflow');
        }
    }, [router]);

    const [project, setProject] = useState({
        id: null,
        name: '',
        description: '',
        deadline_at: ''
    });

    const handleClickAdd = () => {
        if (currentTypeTab == 'tasks') {
            setMode('add');
        } else {
            router.push('/project/select');
        }
    };

    useEffect(() => {
        if (dest?.id) {
            setVisiable(true);
            console.log(dest);
        }
    }, [dest]);

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 py-4 sm:px-6 lg:px-8">
                <Typography level="h2" component="h1">待辦事項與工作流</Typography>
                <div className="mt-4 pb-4">
                    <div className="flex flex-row justify-between items-center  py-2">
                        <ul className="flex flex-row -my-px">
                            <li
                                onClick={() => setCurrentTypeTab('tasks')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'tasks'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                待辦事項
                            </li>
                            <li
                                onClick={() => setCurrentTypeTab('project_workflow')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'project_workflow'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                工作流
                            </li>
                        </ul>
                        {currentTypeTab == 'tasks' && (
                            <button
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => {
                                    handleClickAdd();
                                }}
                            >
                                <PlusIcon className="h-4" />
                                <span>新增</span>
                            </button>
                        )}
                    </div>
                    <div className="my-2 hidden">
                        <MyDateDropdown
                            value={status}
                            datas={statusDatas}
                            onSwitch={onSwitchStatus}
                        />
                    </div>
                    {currentTypeTab == 'tasks' && (
                        <div className="mt-0 rounded-lg">
                            <StepsListView
                                tasks={tasks}
                                setTasks={setTasks}
                                users={users}
                                showArrow={false}
                                showProjectName={true}
                                chain_features={chain_features}
                            />
                            <PaginationView meta={metaSteps} pathname={'/project'} params={null} />
                        </div>
                    )}
                    {currentTypeTab == 'project_workflow' && (
                        <div>
                            <ProjectItem
                                projects={projects}
                                setVisiable={setVisiable}
                                setProject={setProject}
                                meta={meta}
                            />
                        </div>
                    )}
                </div>
            </div>

            <EditTaskModal
                title={currentTask ? '編輯任務' : '新增任務'}
                users={users}
                chain_features={chain_features}
                visable={mode != ''}
                task={currentTask}
                cancelClick={() => {
                    setMode('');
                    setCurrentTask(null);
                }}
                confirmClick={(data: never) => {
                    setMode('');
                    setCurrentTask(null);
                    addProjectStepHandler(data);
                }}
            />

            {/* <FolderTreeForSelect
                {...{
                    mode,
                    setMode,
                    dest,
                    setDest,
                    targetId: ''
                }}
            /> */}
        </>
    );
}
export default ProjectView;
