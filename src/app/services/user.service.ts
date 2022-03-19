import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs'
import { User } from '../models'
import { users } from './mocks'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = users

  constructor(private http: HttpClient) { }

  private withDelay<T>(data: T) {
    return of({ data }).pipe(delay(300))
  }

  getUsers(page = 1, count = 10, name = '') {
    let res = this.users

    if (name !== '') {
      res = res.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    }

    res = res.filter((e, i) => i < (page * count) && i >= (page * count) - count)

    return this.withDelay({
      list: res,
      total: name ? res.length : this.users.length,
      pages: Math.round(name ? this.users.length / count : (res.length / count))
    })
  }

  createUser(user: Omit<User, 'id' | 'learningPlans'>) {
    let u: User = {
      ...user,
      id: Math.floor(Math.random() * 1000),
      learningPlans: [],
    }

    this.users = [...this.users, u]

    return this.withDelay({})
  }

  deleteUser(id: number) {
    this.users = this.users.filter(e => e.id !== id)

    return this.withDelay({})
  }
}
