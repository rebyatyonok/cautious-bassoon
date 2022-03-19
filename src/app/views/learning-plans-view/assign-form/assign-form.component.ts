import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectOption } from 'src/app/components/select/select.component'
import { User } from 'src/app/models'
import { UserService } from 'src/app/services/user.service'

export type FormData = {
  users: SelectOption[]
}

@Component({
  selector: 'app-assign-form',
  templateUrl: './assign-form.component.html',
  styleUrls: ['./assign-form.component.scss']
})
export class AssignFormComponent implements OnInit {
  users: User[] = []
  formData = this.getEmptyFormData()
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  get isFormDataCorrect() {
    return this.formData.users.length > 0
  }

  get userOptions(): SelectOption[] {
    return this.users.map(e => ({ label: e.name, value: e.id }))
  }

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  private getEmptyFormData(): FormData {
    return {
      users: []
    }
  }

  reset() {
    this.formData.users = []
  }

  handleSubmitButtonClick(event: Event) {
    event.preventDefault()

    if (!this.isFormDataCorrect) return

    this.submit.emit(this.formData)
  }

  handleCancelButtonClick(event: Event) {
    event.preventDefault()

    this.formData = this.getEmptyFormData()

    this.cancel.emit()
  }

  loadUsers() {
    this.usersService.getUsers(1, 30).subscribe(e => {
      this.users = e.data.list
    })
  }
}
