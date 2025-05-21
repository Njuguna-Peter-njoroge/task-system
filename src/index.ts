  interface  User{
id:number;
name :string;
description:string;
}

 interface Task{
    id:number;
    description:string;
    assignedTo?:string;
 }
 class  user implements User {
    constructor(public id:number, public name:string,  public description:string,){}
  } 

   class  task implements Task {
    constructor(public id:number,  public description:string,  public assignedTo?:string,){}
  } 

  class Taskmanager{
    users: User[]=[];
    tasks:Task[]=[];


    
  }