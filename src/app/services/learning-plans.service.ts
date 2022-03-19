import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs'
import { LearningPlan, LearningPlanStatus } from '../models'
import { learningPlans } from './mocks'

@Injectable({
  providedIn: 'root'
})
export class LearningPlansService {
  plans = learningPlans
  constructor(private http: HttpClient) { }

  private withDelay<T>(data: T) {
    return of({ data }).pipe(delay(300))
  }

  getPlans(page = 1, count = 10, name = '') {
    let res = this.plans

    if (name !== '') {
      res = res.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    }

    res = res.filter((e, i) => i < (page * count) && i >= (page * count) - count)

    return this.withDelay({
      list: res,
      total: name ? res.length : this.plans.length,
      pages: Math.round(name ? this.plans.length / count : (res.length / count))
    })
  }

  create(plan: Omit<LearningPlan, 'id' | 'status'>) {
    let p = {
      ...plan,
      id: Math.floor(Math.random() * 1000),
      status: LearningPlanStatus.ACTIVE
    }

    this.plans = [...this.plans, p]

    return this.withDelay({})
  }

  changeStatus(id: number, status: LearningPlanStatus) {
    this.plans = this.plans.map(e => {
      if (e.id === id) {
        e.status = status
      }
      return e
    })
  }

  assignToUsers(id: number, usersId: number[]) {
    return this.withDelay({})
  }
}
