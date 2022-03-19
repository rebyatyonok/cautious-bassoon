import { Component, EventEmitter, Output } from '@angular/core';
import { LearningPlan } from 'src/app/models'

export type FormData = Required<Omit<LearningPlan, 'id' | 'status'>>

@Component({
  selector: 'app-learning-plan-form',
  templateUrl: './learning-plan-form.component.html',
  styleUrls: ['./learning-plan-form.component.scss']
})
export class LearningPlanFormComponent {
  formData = this.getEmptyFormData()
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  get isFormDataCorrect() {
    return this.formData.name
  }

  constructor() { }

  private getEmptyFormData(): FormData {
    return {
      name: ''
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

    this.cancel.emit(this.formData)
  }

  handleInput(value: string, field: keyof FormData) {
    this.formData[field] = value
  }
}
