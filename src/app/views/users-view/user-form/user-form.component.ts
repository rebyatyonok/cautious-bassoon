import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models'

export type FormData = Required<Omit<User, 'id' | 'learningPlans'>>

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  formData = this.getEmptyFormData()
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  get isFormDataCorrect() {
    return this.formData.name && this.formData.email
  }

  constructor() { }

  private getEmptyFormData(): FormData {
    return {
      avatar: '',
      name: '',
      email: '',
    }
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

  handleInput(value: string, field: keyof FormData) {
    this.formData[field] = value
  }
}
