import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input, Card } from '@mui/joy';
import { Switch } from '@headlessui/react';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogRowView from '../../../components/project/step/LogRowView';
import StepsListView from '../../../components/project/step/StepsListView';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface ProjectDetailViewProps {
    project: any;
    tasks: [];
    setTasks: any;
    open: boolean;
    setOpen: any;
    users: any;
}

function ProjectDetailView(props: ProjectDetailViewProps) {
    const { project = null, tasks, setTasks, open, setOpen, users } = props;
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [tmpTasks, setTmpTasks] = useState<any>([]);
    const [hideCompletedTask, setHideCompleted] = useState(false);
    const [currentTypeTab, setCurrentTypeTab] = useState<'tasks' | 'logs'>('tasks');

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const count = _.countBy(tasks, function (step: any) {
                return step.status == 'completed';
            }).true;
            if (count > 0) {
                setProgress(_.floor(_.divide(count, tasks.length) * 100, 2));
            } else {
                setProgress(0);
            }
        }
    }, [tasks, tmpTasks]);

    useEffect(() => {
        setTmpTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        if (hideCompletedTask) {
            setTmpTasks(
                _.filter(tmpTasks, function (task: any) {
                    return task.status != 'completed';
                })
            );
        } else {
            setTmpTasks(tasks);
        }
    }, [hideCompletedTask]);

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

                        <Typography level="h2" component="h1">工作流</Typography>

                        <Box sx={{ width: '20%' }}>
                        </Box>
                    </Box>
                    <Card>
                        <Box>
                            <Box>
                                <Typography color="primary" fontWeight={500} fontSize={12}>{project?.name}</Typography>
                                <Link href={`/project/edit?id=${project?.id}`}>編輯</Link>
                            </Box>
                            <Button
                                color="primary"
                                size="sm"
                                onClick={() => { }}>
                                開始
                            </Button>
                        </Box>

                    </Card>
                    <header className="shadow bg-white py-4 flex flex-col justify-between items-center">
                        <div className="w-full flex flex-row px-4 sm:px-6 lg:px-8 ">
                            <div className="flex-1   ">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {project?.name}
                                    <a
                                        className="text-sm underline text-blue-500 ml-4 cursor-pointer"
                                        href={`/project/edit?id=${project?.id}`}
                                    >
                                        編輯
                                    </a>
                                </h1>
                                <span className="text-md text-gray-500 sm:text-md">
                                    {project?.description}
                                </span>
                            </div>
                            <div className="flex-0 flex flex-row justify-center items-center">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => { }}>
                                    開始
                                </Button>
                                {/* <BButton
                                    name="開始"
                                    icon={<PlayIcon className="w-4 mr-2" />}
                                    onClick={() => { }}
                                /> */}
                                {/* <BButton
                                name='暫停'
                                icon={<PlayPauseIcon className="w-4 mr-2" />}
                                onClick={() => {

                                }}
                            />
                            <BButton
                                name='由頭開始'
                                icon={<PauseIcon className="w-4 mr-2" />}
                                onClick={() => {

                                }}
                            />
                            <BButton
                                name='恢復'
                                icon={<BackwardIcon className="w-4 mr-2" />}
                                onClick={() => {

                                }}
                            /> */}
                            </div>
                        </div>
                        {project && (
                            <div className="flex w-full px-4 sm:px-6 lg:px-8  justify-between flex-row items-center mt-2">
                                <span className="text-sm">狀態: 進行中</span>
                                <div>
                                    <Switch.Group as="div" className="flex items-center">
                                        <Switch
                                            defaultChecked={hideCompletedTask}
                                            onChange={() => {
                                                setHideCompleted(!hideCompletedTask);
                                            }}
                                            className={`${hideCompletedTask ? 'bg-indigo-600' : 'bg-gray-200'
                                                }
                                'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            `}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`${hideCompletedTask
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                                    }
                                    'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                `}
                                            />
                                        </Switch>
                                        <Switch.Label as="span" className="ml-3">
                                            <span className="text-sm font-medium text-gray-900">
                                                隱藏完成任務{' '}
                                            </span>
                                        </Switch.Label>
                                    </Switch.Group>
                                </div>
                            </div>
                        )}
                    </header>
                    <div className="my-2">
                        <ul className="flex flex-row -my-px">
                            <li
                                onClick={() => setCurrentTypeTab('tasks')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'tasks'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                任務
                            </li>
                            <li
                                onClick={() => setCurrentTypeTab('logs')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'logs'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                操作日誌
                            </li>
                        </ul>
                    </div>
                    {currentTypeTab === 'tasks' && (
                        <div className="my-2">
                            <StepsListView
                                tasks={tmpTasks?.sort((a: any, b: any) =>
                                    a.status > b.status ? -1 : 1
                                )}
                                setTasks={setTmpTasks}
                                users={users}
                                chain_features={[]}
                            />
                        </div>
                    )}
                    {currentTypeTab === 'logs' && (
                        <div className="my-2">
                            <LogRowView title="第一次運行" />
                            <LogRowView title="第二次運行" />
                            <LogRowView title="第三次運行" />
                        </div>
                    )}

                </Box >

            </Box >
        </>
    );
}
export default ProjectDetailView;
