interface Project {
    getProjectId(): string;
    getTitle(): string;
    getDesc(): string;
    getDeadline(): string;
    add(project: Project): void;
    remove(project: Project): void;
    display(): void;
}

interface Task {
    getTaskId(): string;
    getTitle(): string;
    getDesc(): string;
    getDeadline(): string;
    getPriority(): string;
}

class Project implements Project {
    private projectId: string;
    private title: string;
    private desc: string;
    private deadline: string;
    private projects: Project[] = [];
    private tasks: Task[] = [];

    constructor(projectId: string, title: string, desc: string, deadline: string, projects: Project[] = []) {
        this.projectId = projectId;
        this.title = title;
        this.desc = desc;
        this.deadline = deadline;
        this.projects = projects;
    }

    getProjectId() {
        return this.projectId;
    }

    getTitle() {
        return this.title;
    }

    getDesc() {
        return this.desc;
    }

    getDeadline() {
        return this.deadline;
    }

    add(project: Project) {
        this.projects.push(project);
    }

    remove(project: Project) {
        this.projects = this.projects.filter(p => p !== project);
    }

    display() {
        console.log('-------------------');
        console.log(`Project ID: ${this.projectId}`);
        console.log(`Project: ${this.title}`);
        console.log(`Desc: ${this.desc}`);
        console.log(`Deadline: ${this.deadline}`);
        console.log('Projects:');
        this.projects.forEach(p => p.display());
    }
}

class Task implements Task {
    private taskId: string;
    private title: string;
    private desc: string;
    private deadline: string;
    private priority: string;

    constructor(taskId: string, title: string, desc: string, deadline: string, priority: string) {
        this.taskId = taskId;
        this.title = title;
        this.desc = desc;
        this.deadline = deadline;
        this.priority = priority;
    }

    getTaskId(): string {
        return this.taskId;
    }

    getTitle() {
        return this.title;
    }

    getDesc() {
        return this.desc;
    }

    getDeadline() {
        return this.deadline;
    }

    getPriority() {
        return this.priority;
    }
}

export function buildProject (projectsData: any, tasksData: any) {
    console.log("PROJECT DATA CREA COMPOSITE")
    console.log(projectsData)
    console.log(tasksData)
    const projectMap = new Map();

    projectsData.forEach((proj: { id: { toString: () => string; }; title: string; description: string; }) => {
        const project = new Project(proj.id.toString(), proj.title, proj.description, '2024-12-31'); // Deadline fictive pour l'exemple
        projectMap.set(proj.id, project);
    });

    projectsData.forEach((proj: { parent: any; id: any; }) => {
        if (proj.parent) {
            const parentProject = projectMap.get(proj.parent);
            const currentProject = projectMap.get(proj.id);
            parentProject.add(currentProject);
        }
    });

    tasksData.forEach((task: { parent: any; id: { toString: () => string; }; title: string; description: string; }) => {
        const project = projectMap.get(task.parent);
        const newTask = new Task(task.id.toString(), task.title, task.description, '2024-12-31', 'Medium'); // Deadline et priorité fictives pour l'exemple
        project.tasks.push(newTask);
    });

    return projectMap.get(projectsData.find((proj: { parent: any; }) => !proj.parent).id);
}