/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Task {
      static remote = new Remote("http://127.0.0.1:8083/Task")
  
      static async getAll(token) {
          return Task.remote.call("Task.getAll", token)  
      }
  
      static async getById(token, id) {
          return Task.remote.call("Task.getById", token, id)  
      }
  
      static async create(token, title, description) {
          return Task.remote.call("Task.create", token, title, description)  
      }
  
      static async update(token, id, title, description, status) {
          return Task.remote.call("Task.update", token, id, title, description, status)  
      }
  
      static async delete(token, id) {
          return Task.remote.call("Task.delete", token, id)  
      }
  
      
  }
  
  export { Remote };
  