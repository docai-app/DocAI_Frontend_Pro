'use client';

import useAxios from 'axios-hooks';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import ProjectDetailView from './ProjectDetailView';

const apiSetting = new Api();

export default function ProjectDetailContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [project, setProject] = useState<any>();
    const [tasks, setTasks] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<any>([]);

    const [{ data: getProjectWorkflowByIdData, loading }, getProjectWorkflowById] = useAxios(
        apiSetting.ProjectWorkflow.getProjectWorkflowById(''),
        { manual: true }
    );

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        if (router && searchParams.get('id')) {
            getProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.getProjectWorkflowById(searchParams.get('id') as string)
            });
            getAllUsers();
        }
    }, [router]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    useEffect(() => {
        if (getProjectWorkflowByIdData && getProjectWorkflowByIdData.success) {
            // console.log(getProjectWorkflowByIdData);
            setProject(getProjectWorkflowByIdData.project_workflow);
            setTasks(getProjectWorkflowByIdData.project_workflow.steps);
        }
    }, [getProjectWorkflowByIdData]);

    return (
        <ProjectDetailView
            {...{
                project,
                tasks,
                setTasks,
                open,
                setOpen,
                users
            }}
        />
    );
}
