import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import Radio from '@mui/joy/Radio';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import { ArrowLongDownIcon, } from '@heroicons/react/20/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import BButton from '../../../components/common/Widget/buttons/BButton';
import DocumentPath from '../../../components/common/Widget/DocumentPath';
import EditTaskModal from '../../../components/project/task/EditTaskModal';
import TaskRow from '../../../components/project/task/TaskRow';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Add from '@mui/icons-material/Add';

const apiSetting = new Api();

interface ProjectViewProps {
    project: any;
    setProject: any;
    modalDescription: any;
    users: [];
    chain_features: [];
    open: boolean;
    setOpen: any;
    addProjectStepHandler: any;
    updateProjectStepHandler: any;
    deleteProjectStepHandler: any;
    handleSave: any;
}

function ProjectEditView(props: ProjectViewProps) {
    const {
        open,
        setOpen,
        modalDescription,
        project,
        setProject,
        users,
        chain_features,
        addProjectStepHandler,
        updateProjectStepHandler,
        deleteProjectStepHandler,
        handleSave
    } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [target_folder_id, set_target_folder_id] = useState('');
    const [mode, setMode] = useState<'add' | 'edit' | ''>('');
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        if (project && project.folder_id) {
            set_target_folder_id(project.folder_id);
        }
        if (project && project.steps && project.steps.length > 0) {
            // console.log('1', project.steps);
            setTasks(project.steps);
        }
        if (router && searchParams.get('template')) {
            const newTasks = _.map(project?.steps, function (step) {
                return {
                    assignee_id: step.assignee_id,
                    deadline: step.deadline,
                    description: step.description,
                    name: step.name,
                    status: 'pending'
                };
            });
            setTasks(newTasks);
        }
    }, [router, project]);
    const methods = [
        { id: 'undepend', title: '不依賴' },
        { id: 'depend', title: '依賴' }
    ];

    const removeTask = (task: any, position: number) => {
        tasks.splice(position, 1);
        updateLocalData();
        // console.log(task);
        if (task.id) {
            deleteProjectStepHandler(task);
        }
    };

    const updateLocalData = () => {
        const newTasks = [...tasks];
        setTasks(newTasks);
    };

    const updateTask = (task: any, position: number) => {
        setMode('edit');
        setCurrentTask(task);
        setCurrectPosition(position);
    };

    const handleBack = () => {
        router.back();
    };

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
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button color="primary" variant="plain"
                            startDecorator={<KeyboardArrowLeftIcon />}
                            onClick={() => {
                                router.back();
                            }}>
                            返回
                        </Button>

                        <Typography level="h2" component="h1">Workflow Builder</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'end', width: '20%' }}>
                            <Button
                                color="primary"
                                size="sm"
                                onClick={() => {
                                    handleSave(project, tasks);
                                }}>
                                部署
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <Input
                            type="text"
                            startDecorator={<Typography>名稱:</Typography>}
                            placeholder="名稱..."
                            defaultValue={project?.name}
                            onChange={(e) => {
                                setProject({
                                    ...project,
                                    name: e.target.value
                                });
                            }}
                            sx={{ mb: 1 }} />
                        <Textarea minRows={2}
                            placeholder="描述..."
                            startDecorator={<Typography sx={{ ml: 1 }}>描述:</Typography>}
                            defaultValue={project?.description}
                            onChange={(e) => {
                                setProject({
                                    ...project,
                                    description: e.target.value
                                });
                            }}
                            sx={{ mb: 1 }}>
                        </Textarea>
                        <DocumentPath
                            modeType={'move'}
                            target_folder_id={target_folder_id}
                            set_target_folder_id={(folder_id: string) => {
                                setProject({
                                    ...project,
                                    folder_id: folder_id
                                });
                            }}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 1, gap: 10 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography>任務關係:</Typography>
                                {searchParams.get('id') == null && (
                                    <>
                                        <Radio
                                            name="is_process_workflow"
                                            label="不依賴"
                                            defaultChecked={project?.is_process_workflow == false}
                                            disabled={searchParams.get('id') != null}
                                            onChange={(e) => {
                                                setProject({
                                                    ...project,
                                                    is_process_workflow: false
                                                });
                                            }}
                                        />
                                        <Radio
                                            name="is_process_workflow"
                                            label="依賴"
                                            defaultChecked={project?.is_process_workflow == true}
                                            disabled={searchParams.get('id') != null}
                                            onChange={(e) => {
                                                setProject({
                                                    ...project,
                                                    is_process_workflow: true
                                                });
                                            }}
                                        />
                                    </>
                                )}
                                {searchParams.get('id') != null &&
                                    (project?.is_process_workflow ? (
                                        <label className="ml-2 block text-sm font-medium text-gray-500">
                                            依賴
                                        </label>
                                    ) : (
                                        <label className="ml-2 block text-sm font-medium text-gray-500">
                                            不依賴
                                        </label>
                                    ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                設定為範本:
                                <Checkbox color="primary" variant="plain"
                                    name="is_process_workflow"
                                    defaultChecked={project?.is_template}
                                    onChange={(e) => {
                                        setProject({
                                            ...project,
                                            is_template: e.target.checked
                                        });
                                    }}
                                    sx={{ [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' } }}
                                    slotProps={{ action: { className: checkboxClasses.focusVisible } }} />
                            </Box>
                        </Box>

                        <div className="my-2 flex justify-end">
                            <Button size='sm' variant="soft"
                                color="primary"
                                startDecorator={<Add />}
                                onClick={() => {
                                    setMode('add');
                                }}>
                                新增
                            </Button>
                        </div>
                        {tasks
                            ?.sort((a: any, b: any) => (a.status > b.status ? -1 : 1))
                            ?.map((task: any, index: number) => {
                                return (
                                    <div 
                                        key={index}
                                        className="flex flex-col justify-center items-center"
                                    >
                                        <TaskRow
                                            task={task}
                                            users={users}
                                            disabled={true}
                                            completeTask={() => { }}
                                            updateTask={() => updateTask(task, index)}
                                            removeTask={() => removeTask(task, index)}
                                        />
                                        {index != tasks.length - 1 &&
                                            (project?.is_process_workflow ? (
                                                <ArrowLongDownIcon className="  h-6 text-gray-500  " />
                                            ) : (
                                                <div className="h-6 w-0.5"></div>
                                            ))}
                                    </div>
                                );
                            })}
                    </Box>

                    <EditTaskModal
                        title={currentTask ? '編輯任務' : '新增任務'}
                        visable={mode != ''}
                        task={currentTask}
                        users={users}
                        chain_features={chain_features}
                        cancelClick={() => {
                            setMode('');
                            setCurrentTask(null);
                        }}
                        confirmClick={(data: never) => {
                            setMode('');
                            setCurrentTask(null);
                            if (mode == 'add') {
                                setTasks((arr: any) => [...arr, data]);
                            } else if (mode == 'edit') {
                                tasks.splice(currectPosition, 1, data);
                                updateLocalData();
                            }
                            if (project && project.id) {
                                if (mode == 'add') addProjectStepHandler(data);
                                else updateProjectStepHandler(data);
                            }
                        }}
                    />
                </Box>
            </Box >
        </>
    );
}
export default ProjectEditView;
