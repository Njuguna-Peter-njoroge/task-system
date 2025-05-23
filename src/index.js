"use strict";
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
class Task {
    constructor(id, title, description, assignedTo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
    }
}
class UserService {
    constructor() {
        this.users = [];
        this.lastUserId = 0;
    }
    createUser(name, email) {
        const newUser = new User(++this.lastUserId, name, email);
        this.users.push(newUser);
        return newUser;
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
class TaskService {
    constructor(userService) {
        this.userService = userService;
        this.tasks = [];
        this.lastTaskId = 0;
    }
    createTask(title, description) {
        const newTask = new Task(++this.lastTaskId, title, description);
        this.tasks.push(newTask);
        return newTask;
    }
    getAllTasks() {
        return this.tasks;
    }
    assignTask(taskId, userId) {
        const task = this.tasks.find(t => t.id === taskId);
        const user = this.userService.getUserById(userId);
        if (task && user) {
            task.assignedTo = userId;
            return true;
        }
        return false;
    }
    unassignTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task)
            return false;
        task.assignedTo = undefined;
        return true;
    }
    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}
const createUserNameInput = document.getElementById('ceateUserName');
const createUseremailInput = document.getElementById('createUserEmail');
const createUserBtn = document.getElementById('createBtn');
const getUserIdInput = document.getElementById('getUserId');
const getUserBtn = document.getElementById('getUserId');
const deleteUserIdInput = document.getElementById('deleteUserId');
const deleteUserBtn = document.getElementById('deleteUserBtn');
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
