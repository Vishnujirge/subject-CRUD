import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  constructor(private _todoService : TodoService) { }

  
  @ViewChild('todoForm') todoForm !: NgForm
  @Output() emitNewTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>()

  isInEditMode : boolean = false
  editId !: string
  ngOnInit(): void {

    this._todoService.editTodoSubObs$
          .subscribe(res =>{
            if(res){
              this.editId = res.todoId
              this.todoForm.form.patchValue(res)
              this.isInEditMode = true
            }
          })
  }

  onUpdate(){
    if(this.todoForm.valid){

      let Update_obj = {...this.todoForm.value, todoId : this.editId}
      this._todoService.updateTodo(Update_obj)
          .subscribe({
            next : res =>{
              console.log(res)
              this.todoForm.reset()
              this.isInEditMode = false
            },
            error : err =>{
              console.log(err)
            }
          })
    }
  }

  onTodoAdd(){
    if(this.todoForm.valid){
      let Todo_obj : Itodo = {...this.todoForm.value, todoId : Date.now().toString()}
      this._todoService.createTodo( Todo_obj)
          .subscribe({
            next : data =>{
              this.emitNewTodo.emit(data)
              console.log(data)
              this.todoForm.reset()
            },
            error : err =>{
              console.log(err)
            }
          })
      
    }

    
  }

}
