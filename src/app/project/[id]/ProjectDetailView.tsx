import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input, Card } from '@mui/joy';
import Switch from '@mui/joy/Switch';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogRowView from '../../../components/project/step/LogRowView';
import StepsListView from '../../../components/project/step/StepsListView';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography level="title-lg" fontWeight={700}> {project?.name} </Typography>
                                <Link underline='always' fontWeight={500} fontSize={14}
                                    href={`/project/edit?id=${project?.id}`}
                                >編輯</Link>
                                <Typography> {project?.description} </Typography>
                            </Box>
                            <Button
                                color="primary"
                                size="sm"
                                startDecorator={<PlayArrowTwoToneIcon />}
                                onClick={() => { }}>
                                開始
                            </Button>
                        </Box>

                        {project && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>狀態: 進行中</Typography>
                                <Switch variant="solid"
                                    checked={hideCompletedTask}
                                    onChange={() => {
                                        setHideCompleted(!hideCompletedTask);
                                    }}
                                    startDecorator={<Typography>隱藏完成任務</Typography>}
                                />
                            </Box>
                        )}
                    </Card>

                    <Tabs defaultValue="tasks"
                        sx={{ bgcolor: 'transparent' }}
                    >
                        <TabList underlinePlacement="bottom" size="sm"
                            sx={{
                                display: 'flex',
                                pl: { xs: 0, md: 4 },
                                justifyContent: 'left',
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
                            <Tab value="tasks" indicatorPlacement="bottom"
                                sx={{ borderRadius: '6px 6px 0 0' }}>
                                任務
                            </Tab>
                            <Tab value="logs" indicatorPlacement="bottom"
                                sx={{ borderRadius: '6px 6px 0 0' }}>
                                操作日誌
                            </Tab>
                        </TabList>
                        <TabPanel value="tasks">
                            <StepsListView
                                tasks={tmpTasks?.sort((a: any, b: any) =>
                                    a.status > b.status ? -1 : 1
                                )}
                                setTasks={setTmpTasks}
                                users={users}
                                chain_features={[]}
                            />
                        </TabPanel>
                        <TabPanel value="logs">
                            <div className="my-2">
                                <LogRowView title="第一次運行" />
                                <LogRowView title="第二次運行" />
                                <LogRowView title="第三次運行" />
                            </div>
                        </TabPanel>
                    </Tabs>
                </Box >
            </Box >
        </>
    );
}
export default ProjectDetailView;
