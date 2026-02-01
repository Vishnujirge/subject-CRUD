import { Component, Input, OnInit } from '@angular/core';
import { Itodo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private _todoService : TodoService,
    private _matDialog : MatDialog 
  ) { }

  @Input() todoArr !: Array<Itodo>

  ngOnInit(): void {
  }

  onTodoEdit(todo : Itodo){
    this._todoService.setEditTodo(todo)
  }

  onTodoRemove(id : string){
    let matConfig = new MatDialogConfig()
    matConfig.data = 'Are you Sure Want to Remove ?'
    matConfig.width = '300px'
     let matDialogRef = this._matDialog.open(GetConfirmComponent, matConfig)

     matDialogRef.afterClosed()
        .subscribe(flag =>{
          if(flag){
            this._todoService.removeTodo(id)
                .subscribe({
                  next : res =>{
                    console.log(res)
                  },
                  error : err =>{
                    console.log(err)
                  }
                })
          }
        })

    
   
  }



  // this._todoService.removeTodo(id)
  //           .subscribe({
  //             next : data =>{

  //             },
  //             error : err =>{
  //               console.log(err)
  //             }
  //           })

}
