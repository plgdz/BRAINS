// projects.ts
// Ce fichier contient les fonctions qui permettent de récupérer et de mettre à jour les informations des projets.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import {auth} from "@/auth";
import {
    createProject,
    createTask,
    deleteProject,
    getProject,
    getProjectSub,
    getProjectTasks,
    getProjects,
    updateProject,
    updateTask,
    getProjectBreadcrumbs,
    deleteTask
} from "@/app/lib/db/projects";

export async function projectMiddleware (
    method: string,
    formData: {
        id?: any,
        title?: any,
        content?: any,
        tags?: any[],
        createdAt?: any,
        updatedAt?: any,
        projectTitle?: any,
        projectContent?: any,
        projectTags?: any[],
        projectCreatedAt?: any,
        projectUpdatedAt?: any,
        projectDescription?: any,
        project?: any,
        description?: any,
        project_id?: any,
        projectId?: any,
        projectParent?: any,
        parent?: any,
        ids?: any,

    },
) {
    const session = await auth();
     if (!session) {
         throw new Error('Unauthorized');
     }
    switch (method) {
        case 'createProject':
            if (!formData.project_id) {
                // @ts-ignore
                const pid = session.user.id.toString() + formData.title.substring(0, 3) + Math.floor(Math.random() * 1000).toString();
                formData.project_id = pid;
            }
            // @ts-ignore
            return createProject(session.user.id, formData);
        case 'createTask':
            // @ts-ignore
            return createTask(session.user.id, formData);
        case 'updateProject':
            // @ts-ignore
            return updateProject(session.user.id, formData);
        case 'updateTask':
            // @ts-ignore
            return updateTask(session.user.id, formData);
        case 'deleteProject':
            // @ts-ignore
            return deleteProject    (session.user.id, formData);
        case 'deleteTask':
            // @ts-ignore
            return deleteTask(session.user.id, formData);
        case 'getAll':
            // @ts-ignore
            return await getProjects (session.user.id, formData);
        case 'getProject':
            // @ts-ignore
            return await getProject(session.user.id, formData);
        case 'getProjectSub':
            // @ts-ignore
            return await getProjectSub(session.user.id, formData);
        case 'getProjectTasks':
            // @ts-ignore
            return await getProjectTasks  (session.user.id, formData);
        case 'getProjectBreadcrumbs':
            // @ts-ignore
            return await getProjectBreadcrumbs(session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}



