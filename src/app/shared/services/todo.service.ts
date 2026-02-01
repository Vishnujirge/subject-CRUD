import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Itodo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private editTodoSub$ : Subject<Itodo> = new Subject<Itodo>()

  editTodoSubObs$ : Observable<Itodo> =this.editTodoSub$.asObservable()
  todos : Array<Itodo> = [
    {
      todoItem : "Angular",
      todoId : "01"
    },
    {
      todoItem : "Rxjs",
      todoId : "02"
    },
    {
      todoItem : "Interview",
      todoId : "03"
    }
  ]

  setEditTodo(todo : Itodo){
    this.editTodoSub$.next(todo)
  }

  fetchTodos() : Observable<Itodo[]>{
    return of(this.todos) //API Call
  }

  createTodo(todo : Itodo) : Observable<Itodo>{
    // this.todos.push(todo)
    return of(todo)
  }

  removeTodo(id : string){
    let getIndex = this.todos.findIndex(t => t.todoId === id)
   let todos =  this.todos.splice(getIndex, 1)
    return of(todos[0])
  }

  updateTodo(todo : Itodo) : Observable<Itodo>{

    let getIndex = this.todos.findIndex(t => t.todoId === todo.todoId)
    this.todos[getIndex] = todo
    return of(todo)

  }
}
