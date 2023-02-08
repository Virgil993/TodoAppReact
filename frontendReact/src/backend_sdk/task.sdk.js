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
  
      static async getByOwnerId(token) {
          return Task.remote.call("Task.getByOwnerId", token)  
      }
  
      static async create(token, title, description, ownerId) {
          return Task.remote.call("Task.create", token, title, description, ownerId)  
      }
  
      static async update(token, id, title, description, solved, ownerId) {
          return Task.remote.call("Task.update", token, id, title, description, solved, ownerId)  
      }
  
      static async delete(token, id) {
          return Task.remote.call("Task.delete", token, id)  
      }
  
      
  }
  
  export { Remote };
  