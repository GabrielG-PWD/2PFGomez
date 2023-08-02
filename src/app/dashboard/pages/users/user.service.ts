import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {id:1, name:'Dario', surname:'Fernandez', email:'Dafe@mail.com', password:'Ef14Kbz', grade:8},
    {id:2, name:'Elena', surname:'Kauffman', email:'Dafe@mail.com', password:'Ef14Kbz', grade:8}
  ]

  private subjectUsers$ = new Subject<User[]>();
  private sendNotification$ = new Subject<string>()
  private users$ = new BehaviorSubject<User[]>([]);
  
  constructor() {
    this.sendNotification$.subscribe({
      next: (message) => alert(message)
    })
  }

  sendNotification(notification: string):void {
    this.sendNotification$.next(notification)
  }

  loadUsers():void {
    this.users$.next(this.users)
  }

  getUsers(): Subject<User[]> {
    return this.users$;
  }

  createUser(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }

  deleteUserById(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }

  updateUserById(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }
}
