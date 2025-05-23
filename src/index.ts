// index.ts
interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ITask {
  id: number;
  title: string;
  description: string;
  assignedTo?: number;
}

class User implements IUser {
  constructor(public id: number, public name: string, public email: string) {}
}

class Task implements ITask {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public assignedTo?: number
  ) {}
}

class UserService {
  private users: User[] = [];
  private lastUserId: number = 0;

  createUser(name: string, email: string): User {
    const newUser = new User(++this.lastUserId, name, email);
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

class TaskService {
  private tasks: Task[] = [];
  private lastTaskId: number = 0;
  constructor(private userService: UserService) {}

  createTask(title: string, description: string): Task {
    const newTask = new Task(++this.lastTaskId, title, description);
    this.tasks.push(newTask);
    return newTask;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  assignTask(taskId: number, userId: number): boolean {
    const task = this.tasks.find(t => t.id === taskId);
    const user = this.userService.getUserById(userId);
    if (task && user) {
      task.assignedTo = userId;
      return true;
    }
    return false;
  }

  unassignTask(taskId: number): boolean {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return false;
    task.assignedTo = undefined;
    return true;
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
const createUserNameInput=document.getElementById('ceateUserName');
const createUseremailInput=document.getElementById('createUserEmail');
const createUserBtn=document.getElementById('createBtn');

const getUserIdInput=document.getElementById('getUserId');
const getUserBtn=document.getElementById('getUserId');

const deleteUserIdInput=document.getElementById('deleteUserId');
const deleteUserBtn=document.getElementById('deleteUserBtn');

const assignTaskIdInput = document.getElementById('assignTaskId');
const assignUserIdInput = document.getElementById('assignUserId');
const assignTaskBtn = document.getElementById('assignTaskBtn');

const userListDisplay = document.getElementById('userList');


const createTaskTitleInput = document.getElementById('createTaskTitle');
const createTaskDescriptionInput = document.getElementById('createTaskDescription');
const createTaskBtn = document.getElementById('createTaskBtn');

const unassignTaskIdInput = document.getElementById('unassignTaskId');
const unassignTaskBtn = document.getElementById('unassignTaskBtn');

const deleteTaskIdInput = document.getElementById('deleteTaskId');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');

const taskListDisplay = document.getElementById('taskList');


const userService = new UserService();
const taskService = new TaskService(userService); 


function renderUsers() {
    userListDisplay.innerHTML = ''; // Clear current list
    const users = userService.getAllUsers();
    if (users.length === 0) {
        userListDisplay.innerHTML = '<li>No users created yet.</li>';
        return;
    }
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>ID: ${user.id}</span>
            <strong>${user.name}</strong> (${user.email})
        `;
        userListDisplay.appendChild(li);
    });
}