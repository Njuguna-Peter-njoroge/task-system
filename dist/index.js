"use strict";
class user {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
class task {
    constructor(id, description, assignedTo) {
        this.id = id;
        this.description = description;
        this.assignedTo = assignedTo;
    }
}
class Taskmanager {
    constructor() {
        this.users = [];
        this.tasks = [];
    }
}
