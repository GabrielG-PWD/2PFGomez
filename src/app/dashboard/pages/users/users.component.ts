import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, map, tap } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  public users: Observable<User[]>;
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService
    ) {
      this.users = this.userService.getUsers().pipe(
        tap((valorOriginal) => console.log('Valor antes del map', valorOriginal)),
        map((valorOriginal) => 
          valorOriginal.map((usuario) =>  ({
            ...usuario, 
            name: usuario.name.toUpperCase()
          }))
        ),
        tap((valorMapeado) => console.log('Valor despues del map:', valorMapeado))
      );
      this.userService.loadUsers();

      // this.userService.getUsers().subscribe({
      //   next: (v) => {
      //     this.users = v;
      //   }
      // })
  }


  onCreateUser():void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Se cargaron los usuarios correctamente')
          this.userService.createUser({
            id: new Date().getTime(),
            name: v.name,
            surname: v.surname,
            email: v.email,
            password: v.password,
            grade: v.grade
          })
        } else {
          console.log('Se cancelo');
        }
      }
    })
  }

  onDeleteUser(userToDelete:User):void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      // this.users = this.users.filter( u => u.id != userToDelete.id)
    }
  }

  onEditUser(userToEdit:User):void {
    this.matDialog
    .open(UserFormDialogComponent, {
      data: userToEdit
    })
    .afterClosed()
    .subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
          // this.users = this.users.map(user => {
          //   return user.id === userToEdit.id 
          //     ? { ...user, ...userUpdated}
          //     : user
          // })
        }
      }
    })
  }
}