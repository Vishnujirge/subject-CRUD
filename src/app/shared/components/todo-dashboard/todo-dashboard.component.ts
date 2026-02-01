import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../model/todo';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {

  constructor(private _todoService : TodoService) { }

  todoArr : Array<Itodo> = []

  ngOnInit(): void {

    this._todoService.fetchTodos()
        .subscribe(data =>{
          this.todoArr = data
        })
  }

  getNewTodo(todo : Itodo){
    this.todoArr.push(todo)
    
  }

}
