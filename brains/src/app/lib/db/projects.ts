// db/projects.ts
// Ce fichier contient les fonctions de manipulation de la base de données pour les projets dans la base de donnees.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';
import {revalidatePath} from "next/cache";

export async function createProject(
    userId: string,
    formData: { project_id: string, parent: string, title: string, description: string, date: string },
) {

    try {
        const result = await pool.projects_test.create({
            data: {
                user_id: Number(userId),
                project_id: formData.project_id,
                parent: formData.parent,
                title: formData.title,
                description: formData.description,
                // @ts-ignore
                date: formData.date
            }
        });
        revalidatePath('/dashboard/projects/' + formData.project_id + '-' + formData.parent);
        return result;
    } catch (error) {
        console.log(error)
        // add handle err
    }
}

export async function createTask(
    userId: string,
    formData: { project_id: string, id: number, title: string, description: string },
) {
    try {
        const result = await pool.tasks.create({
            data: {
                user_id: Number(userId),
                project_id: formData.project_id,
                parent: formData.id,
                title: formData.title,
                description: formData.description
            }
        });
        revalidatePath('/dashboard/projects/' + formData.project_id + '-' + formData.id);
    } catch (error) {
        console.log(error)
        // add handle err
    }
}

export async function updateProject(
    userId: string,
    formData: { id: number, project_id: string, title: string, description: string, date: string},
) {
    try {

        const result = await pool.projects_test.update({
            where: {
                id: formData.id,
                project_id: formData.project_id,
            },
            data: {
                title: formData.title,
                description: formData.description,
                // @ts-ignore
                date: formData.date
            }
        });
        return result;
    } catch (error) {
        console.log('error', error)
    }
}

export async function updateTask(
    userId: string,
    formData: {
        task_id: number,
        project_id: string,
        title: string,
        description: string
    }
) {
    try {
        const result = await pool.tasks.update({
            where: {
                task_id: Number(formData.task_id),
                project_id: formData.project_id,
            },
            data: {
                title: formData.title,
                description: formData.description,
            }
        });
    } catch (error) {
        console.log('error', error)
    }
}

export async function deleteProject(
    userId: string,
    formData: { id: string },
) {
    try {
        const result = await pool.projects_test.deleteMany({
            where: {
                OR: [
                    {
                        id: Number(formData.id),
                    },
                    {
                        parent: formData.id,
                    }
                ]
            }
        });
        await pool.tasks.deleteMany({
            where: {
                parent: Number(formData.id),
            }
        });
    } catch (error) {
        console.log('error', error)
    }
}

export async function getProjects(
    userId: string,
    formData: FormData,
) {
    try {
        const result = await pool.projects_test.findMany({
            where: {
                user_id: Number(userId),
                parent: null,
            }
        });
        return result;
    } catch (error) {
        // add handle err
    }
}

export async function getProject(
    userId: string,
    formData: {
        project_id: string,
        id: string
    },
) {
    try {
        const result = await pool.projects_test.findMany({
            where: {
                user_id: Number(userId),
                id: Number(formData.id),
            }
        });
        return result;
    } catch (error) {
        console.log('error GETTING PROJECT', error);
    }
}

export async function getProjectSub(
    userId: string,
    formData: { parent: string},
) {
    try {
        const result = await pool.projects_test.findMany({
            where: {
                user_id: Number(userId),
                parent: formData.parent,
            }
        });
        return result;
    } catch (error) {
        console.log('error GETTING PROJECT SUB', error)
    }
}

export async function getProjectTasks(
    userId: string,
    formData: {
        ids: {
            id: string,
            project_id: string,
        }
    },
) {
    try {
        const result = await pool.tasks.findMany({
            where: {
                user_id: Number(userId),
                project_id: formData.ids.project_id,
                parent: Number(formData.ids.id,)
            }
        });
        return result;
    } catch (error) {
        console.log('error', error)
        // add handle err
    }
}

export async function getProjectBreadcrumbs(
    userId: string,
    formData: {
        ids : {
        project_id: string
    }},
)
{

    try {
        const result = await pool.projects_test.findMany({
            select: {
                id: true,
                parent: true,
                title: true,
                project_id: true,
            },
            where: {
                user_id: Number(userId),
                project_id: formData.ids.project_id,
            }
        });
        return result;
    } catch (error) {
        console.log('error PROJET BREADCRUMBS', error)

    }
}

export async function deleteTask(
    userId: string,
    formData: {
        id: number,
    },
) {
    try {
        const result = await pool.tasks.deleteMany({
            where: {
                task_id: formData.id,
            }
        });
    } catch (error) {
        console.log('error', error)
    }
}