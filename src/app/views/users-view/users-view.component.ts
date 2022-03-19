import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component'
import { User } from 'src/app/models'
import { UserService } from 'src/app/services/user.service'
import { FormData } from './user-form/user-form.component'

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent implements OnInit, OnDestroy {
  currentPage = 1
  name = ''
  users: User[] = []
  total = 0
  isLoading = false
  selectedUser: User | null = null
  isUserFormOpened = false
  isAssignedLearningsPopupOpened = false

  @ViewChild(ConfirmationComponent) confirm!: ConfirmationComponent

  constructor(private userService: UserService) { }

  subscriptions: Record<string, Subscription> = {}

  ngOnInit(): void {
    this.getUsers()
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach(e => e.unsubscribe())
  }

  openAssignedLearningsPopup(user: User) {
    this.selectedUser = user
    this.isAssignedLearningsPopupOpened = true
  }

  handlePageChange(page: number) {
    this.currentPage = page
    this.getUsers()
  }

  handleUserSearch(name: string) {
    this.currentPage = 1
    this.name = name
    this.getUsers()
  }

  handleUserCreate(data: FormData) {
    this.userService.createUser(data)
    this.getUsers()
    this.isUserFormOpened = false
  }

  async handleUserDelete(id: number) {
    const res = await this.confirm.show()

    if (res === null) return

    if (res) {
      this.userService.deleteUser(id)
      this.getUsers()
    }
  }

  getUsers() {
    this.isLoading = true

    this.subscriptions['users'] = this.userService.getUsers(
      this.currentPage, 10, this.name
    ).subscribe((res) => {
      this.isLoading = false
      this.users = res.data.list
      this.total = res.data.total
      console.log(this.users)
    })
  }
}
