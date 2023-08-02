import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  public users: User[] = [];
  constructor(
    private matDialog: MatDialog,
    private userService: UserService
    ) {
      this.userService.loadUsers();

      this.userService.getUsers().subscribe({
        next: (v) => {
          this.users = v;
          this.userService.sendNotification('Se cargaron los usuarios')
        }
      })
  }


  onCreateUser():void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.userService.createUser(v)
        } else {
          console.log('Se cancelo');
        }
      }
    })
  }

  onDeleteUser(userToDelete:User):void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter( u => u.id != userToDelete.id)
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
          this.users = this.users.map(user => {
            return user.id === userToEdit.id 
              ? { ...user, ...userUpdated}
              : user
          })
        }
      }
    })
  }
}