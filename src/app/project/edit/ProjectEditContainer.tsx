'use client';

import useAxios from 'axios-hooks';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import { getAllWorkflowChainFeatureDatas } from '../../../apis/AirtableChainFeature';
import useAlert from '../../../hooks/useAlert';
import ProjectEditView from './ProjectEditView';

const apiSetting = new Api();

export default function ProjectEditContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAlert } = useAlert();
    const [meta, setMeta] = useState();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<any>([]);
    const [chain_features, set_chain_features] = useState<any>([]);
    const [modalDescription, setModalDescription] = useState({});
    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
        meta: {},
        steps: [],
        status: 'draft',
        is_process_workflow: false,
        folder_id: '',
        is_template: false
    });

    const [
        { data: addNewProjectData, loading: addProjectLoading, error: addNewProjectError },
        addNewProject
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflow(), { manual: true });

    const [{ data: getProjectWorkflowByIdData, loading }, getProjectWorkflowById] = useAxios(
        apiSetting.ProjectWorkflow.getProjectWorkflowById(''),
        { manual: true }
    );

    const [{ data: updateProjectData, loading: updateProjectLoading }, updateProjectWorkflowById] =
        useAxios(apiSetting.ProjectWorkflow.updateProjectWorkflowById(''), { manual: true });

    const [
        { data: addProjectWorkflowStepByIdData, loading: addProjectWorkflowStepByIdLoading },
        addProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflowStepById(), { manual: true });

    const [
        { data: updateProjectWorkflowStepByIdData, loading: updateProjectWorkflowStepByIdLoading },
        updateProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(''), { manual: true });

    const [
        { data: deleteProjectWorkflowStepByIdData, loading: deleteProjectWorkflowStepByIdLoading },
        deleteProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(''), { manual: true });

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    useEffect(() => {
        setModalDescription({
            title: '進行中......',
            description: '正在加載數據'
        });
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        setModalDescription({
            title: '進行中......',
            description: '正在保存數據'
        });
        setOpen(addProjectLoading);
    }, [addProjectLoading]);

    useEffect(() => {
        setModalDescription({
            title: '進行中......',
            description: '正在保存數據'
        });
        setOpen(updateProjectLoading);
    }, [updateProjectLoading]);

    useEffect(() => {
        if (router && searchParams.get('id')) {
            getProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.getProjectWorkflowById(
                    searchParams.get('id') as string
                )
            });
        }
        if (router && searchParams.get('template')) {
            const template = JSON.parse(searchParams.get('template') as string);
            if (template?.tasks && template.tasks.length > 0)
                setProject({
                    ...template,
                    steps: template.tasks
                });
            else {
                setProject(template);
            }
        }
        getAllUsers();
        getAllWorkflowChainFeatureDatas().then((res) => {
            set_chain_features(res);
        });
    }, [router]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    useEffect(() => {
        if (getProjectWorkflowByIdData && getProjectWorkflowByIdData.success) {
            console.log('getProjectWorkflowByIdData', getProjectWorkflowByIdData);
            setProject(getProjectWorkflowByIdData.project_workflow);
        }
    }, [getProjectWorkflowByIdData]);

    useEffect(() => {
        if (updateProjectWorkflowStepByIdData && updateProjectWorkflowStepByIdData.success) {
            console.log('updateProjectWorkflowStepByIdData', updateProjectWorkflowStepByIdData);
        }
    }, [updateProjectWorkflowStepByIdData]);

    const addProjectHeadler = useCallback(
        async (data: any, tasks: any) => {
            console.log(data, tasks);
            const { name, description, is_process_workflow, folder_id, is_template } = data;
            // console.log(parent_id);
            if (!name) return setAlert({ title: '請輸入名稱', type: 'info' });
            if (!folder_id) return setAlert({ title: '請選擇儲存路徑', type: 'info' });
            addNewProject({
                data: {
                    name: name,
                    description: description,
                    steps: tasks,
                    is_process_workflow: is_process_workflow,
                    folder_id: folder_id,
                    is_template: is_template || false
                }
            });
        },
        [router, addNewProject]
    );

    const updateProjectHandler = useCallback(
        async (id: any, data: any) => {
            const { name, description, steps, is_process_workflow, folder_id, is_template } = data;
            console.log(data);
            if (!name) return setAlert({ title: '請輸入名稱', type: 'info' });
            if (!folder_id) return setAlert({ title: '請選擇儲存路徑', type: 'info' });
            updateProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowById(id),
                data: {
                    name: name,
                    description: description,
                    is_process_workflow: is_process_workflow,
                    folder_id: folder_id,
                    is_template: is_template || false
                }
            });
        },
        [updateProjectWorkflowById]
    );

    const handleSave = useCallback(
        async (data: any, tasks: any) => {
            if (router && searchParams.get('id')) {
                updateProjectHandler(searchParams.get('id'), data);
            } else {
                addProjectHeadler(data, tasks);
            }
        },
        [router]
    );

    const addProjectStepHandler = useCallback(
        async (data: any) => {
            // console.log(data);
            // console.log(project?.id);
            const { name, description, deadline, assignee_id, dag_meta } = data;
            addProjectWorkflowStepById({
                data: {
                    project_workflow_id: project?.id,
                    name: name,
                    deadline: deadline,
                    description: description,
                    assignee_id: assignee_id,
                    dag_id: dag_meta?.dag_id
                }
            });
        },
        [project, addProjectWorkflowStepById]
    );

    const updateProjectStepHandler = useCallback(
        async (data: any) => {
            // console.log(data);
            const { id, name, description, deadline, assignee_id, dag_meta } = data;
            updateProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(id),
                data: {
                    name: name,
                    description: description,
                    deadline: deadline,
                    assignee_id: assignee_id,
                    dag_id: dag_meta?.dag_id
                }
            });
        },
        [project, updateProjectWorkflowStepById]
    );

    const deleteProjectStepHandler = useCallback(
        async (data: any) => {
            // console.log(data);
            const { id } = data;
            deleteProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(id)
            });
        },
        [project, deleteProjectWorkflowStepById]
    );

    useEffect(() => {
        if (addNewProjectData && addNewProjectData.success) {
            // console.log('addNewProjectData', addNewProjectData);
            setAlert({ title: '保存成功', type: 'success' });
            router.push('/project?type=project_workflow');
        } else if (addNewProjectData && !addNewProjectData.success) {
            setAlert({ title: '保存失败， 請重試', type: 'success' });
        }
    }, [addNewProjectData]);

    useEffect(() => {
        if (updateProjectData && updateProjectData.success) {
            setAlert({ title: '修改成功', type: 'success' });
            router.push('/project?type=project_workflow');
        } else if (updateProjectData && !updateProjectData.success) {
            setAlert({ title: '修改失敗， 請重試', type: 'success' });
        }
    }, [updateProjectData]);

    // useEffect(() => {
    //     if (addProjectWorkflowStepByIdData) {
    //         console.log('addProjectWorkflowStepByIdData', addProjectWorkflowStepByIdData);
    //     }
    // }, [addProjectWorkflowStepByIdData]);

    return (
        <ProjectEditView
            {...{
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
            }}
        />
    );
}
