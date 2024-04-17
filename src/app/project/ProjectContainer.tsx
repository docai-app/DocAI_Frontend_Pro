'use client';

import useAxios from 'axios-hooks';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import { getAllWorkflowChainFeatureDatas } from '../../apis/AirtableChainFeature';
import useAlert from '../../hooks/useAlert';
import ProjectView from './ProjectView';

const apiSetting = new Api();

export default function ProjectContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const searchParams = useSearchParams();
    const queryId = useRef(searchParams.get('id'));
    const queryName = useRef(searchParams.get('name'));
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [projects, setProjects] = useState();
    const [tasks, setTasks] = useState<any>([]);
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);

    const [metaSteps, setMetaSteps] = useState();
    const [users, setUsers] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [chain_features, set_chain_features] = useState<any>([]);

    const [{ data: getAllWorkflowData, loading: getAllWorkflowDataLoading }, getAllWorkflow] =
        useAxios(apiSetting.ProjectWorkflow.getAllWorkflow(page), { manual: true });

    const [{ data: getAllProjectWorkflowStepData, loading }, getAllProjectWorkflowStep] = useAxios(
        apiSetting.ProjectWorkflow.getAllProjectWorkflowStep(page),
        { manual: true }
    );

    const [
        { data: addProjectWorkflowStepByIdData, loading: addProjectWorkflowStepByIdLoading },
        addProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflowStepById(), { manual: true });

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        getAllWorkflow();
        getAllProjectWorkflowStep({
            params: {
                status: 'pending'
            }
        });
        getAllUsers();
        getAllWorkflowChainFeatureDatas().then((res) => {
            set_chain_features(res);
        });
    }, [router]);

    useEffect(() => {
        if (getAllWorkflowData && getAllWorkflowData.success) {
            // console.log('getAllWorkflowData', getAllWorkflowData);
            setProjects(getAllWorkflowData.project_workflows);
            setMeta(getAllWorkflowData.meta);
        }
    }, [getAllWorkflowData]);

    useEffect(() => {
        if (getAllProjectWorkflowStepData && getAllProjectWorkflowStepData.success) {
            // console.log(getAllProjectWorkflowStepData);
            setTasks(getAllProjectWorkflowStepData.project_workflow_steps);
            setMetaSteps(getAllProjectWorkflowStepData.meta);
        }
    }, [getAllProjectWorkflowStepData]);

    useEffect(() => {
        if (searchParams.get('page')) {
            setPage(parseInt(searchParams.get('page') + '') || 1);
        }
    }, [searchParams.get('page')]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    const addProjectStepHandler = useCallback(
        async (data:any) => {
            console.log(data);
            // console.log(project?.id);
            const { name, description, deadline, assignee_id } = data;
            addProjectWorkflowStepById({
                data: {
                    name: name,
                    deadline: deadline,
                    description: description,
                    assignee_id: assignee_id
                }
            }).then((res: any) => {
                if (res.data && res.data.success) {
                    setTasks((arr: any) => [...arr, data]);
                } else {
                    console.log('error', res.data);
                    setAlert({ title: '添加失敗', type: 'error' });
                }
            });
        },
        [addProjectWorkflowStepById]
    );
    // useEffect(() => {
    //     console.log(addProjectWorkflowStepByIdData);
    //     if (addProjectWorkflowStepByIdData && addProjectWorkflowStepByIdData.success) {
    //         setTasks((arr: any) => [...arr, addProjectWorkflowStepByIdData.project_workflow_step]);
    //     }
    // }, [addProjectWorkflowStepByIdData]);

    return (
        <ProjectView
            {...{
                id,
                name,
                projects,
                meta,
                metaSteps,
                currentStatus,
                setCurrentStatus,
                open,
                setOpen,
                tasks,
                setTasks,
                addProjectStepHandler,
                users,
                chain_features
            }}
        />
    );
}
