import { Box, Breadcrumbs, Link, Typography, Chip } from '@mui/joy';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Folder } from '../../components/common/Widget/FolderTree';
// import HeaderBreadCrumb from '../../components/common/Widget/HeaderBreadCrumb';
import MyDateDropdown from '../../components/common/Widget/MyDateDropdown';
import PaginationView from '../../components/common/Widget/PaginationView';
import ProjectItem from '../../components/project/ProjectItem';
import StepsListView from '../../components/project/step/StepsListView';
import EditTaskModal from '../../components/project/task/EditTaskModal';

import Button from '@mui/joy/Button';

import Add from '@mui/icons-material/Add';

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
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography level="h2" component="h1">待辦事項與工作流</Typography>
                    </Box>

                    <Tabs defaultValue="tasks"
                        sx={{ bgcolor: 'transparent' }}
                    >
                        <TabList underlinePlacement="bottom" size="sm"
                            sx={{
                                display: 'flex',
                                pl: { xs: 0, md: 4 },
                                justifyContent: 'space-between',
                                [`&& .${tabClasses.root}`]: {
                                    fontWeight: '600',
                                    flex: 'initial',
                                    color: 'text.tertiary',
                                    [`&.${tabClasses.selected}`]: {
                                        bgcolor: 'transparent',
                                        color: 'text.primary',
                                        '&::after': {
                                            height: '2px',
                                            bgcolor: 'primary.500'
                                        }
                                    }
                                }
                            }}>
                            <Box>
                                <Link underline="none" onClick={() => setCurrentTypeTab('tasks')}>
                                    <Tab value="tasks" indicatorPlacement="bottom"
                                        sx={{ borderRadius: '6px 6px 0 0' }}>
                                        待辦事項
                                    </Tab>
                                </Link>
                                <Link underline="none" onClick={() => setCurrentTypeTab('project_workflow')}>
                                    <Tab value="project_workflow" indicatorPlacement="bottom"
                                        sx={{ borderRadius: '6px 6px 0 0' }}>
                                        工作流
                                    </Tab>
                                </Link>

                            </Box>

                            {currentTypeTab == 'tasks' ? (<Button size='sm'
                                color="primary"
                                variant="plain"
                                startDecorator={<Add />}
                                onClick={() => { handleClickAdd(); }}
                            >
                                新增
                            </Button>)
                                :
                                <span></span>}
                        </TabList>
                        <TabPanel value="tasks">
                            <StepsListView
                                tasks={tasks}
                                setTasks={setTasks}
                                users={users}
                                showArrow={false}
                                showProjectName={true}
                                chain_features={chain_features}
                            />
                            <PaginationView meta={metaSteps} pathname={'/project'} params={null} />

                        </TabPanel>
                        <TabPanel value="project_workflow">
                            <ProjectItem
                                projects={projects}
                                setVisiable={setVisiable}
                                setProject={setProject}
                                meta={meta}
                            />
                        </TabPanel>
                    </Tabs>

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
                </Box>
            </Box>
        </>
    );
}
export default ProjectView;
