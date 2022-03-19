import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs'
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component'
import { SelectOption } from 'src/app/components/select/select.component'
import { LearningPlan, LearningPlanStatus } from 'src/app/models'
import { LearningPlansService } from 'src/app/services/learning-plans.service'
import { AssignFormComponent } from './assign-form/assign-form.component'
import { LearningPlanFormComponent, FormData } from './learning-plan-form/learning-plan-form.component'

@Component({
  selector: 'app-learning-plans-view',
  templateUrl: './learning-plans-view.component.html',
  styleUrls: ['./learning-plans-view.component.scss']
})
export class LearningPlansViewComponent implements OnInit {
  currentPage = 1
  name = ''
  learningPlans: LearningPlan[] = []
  total = 0
  isLoading = false
  learningPlanToAssign: LearningPlan | {} = {}
  isCreateLearningPlanFormOpened = false
  isAssignLearningPlanFormOpened = false

  @ViewChild(ConfirmationComponent) confirm!: ConfirmationComponent

  constructor(private learningPlansService: LearningPlansService) { }

  subscriptions: Record<string, Subscription> = {}

  ngOnInit(): void {
    this.getPlans()
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach(e => e.unsubscribe())
  }

  handlePageChange(page: number) {
    this.currentPage = page
    this.getPlans()
  }

  handleSearch(name: string) {
    this.currentPage = 1
    this.name = name
    this.getPlans()
  }

  handleLearningPlanCreate(data: FormData) {
    this.learningPlansService.create(data)
    this.getPlans()
    this.isCreateLearningPlanFormOpened = false
  }

  handleAssignmentButtonClick(plan: LearningPlan) {
    this.learningPlanToAssign = plan
    this.isAssignLearningPlanFormOpened = true
  }

  handleLearningPlanAssign(event: { users: SelectOption[] }) {
    if (!this.learningPlanToAssign) return

    // @ts-expect-error
    this.learningPlansService.assignToUsers(this.learningPlanToAssign.id, event.users.map(e => e.value)).subscribe(e => {
      this.isAssignLearningPlanFormOpened = false
    })
  }

  async handlePlanStatusChange(plan: LearningPlan) {
    const res = await this.confirm.show()

    if (res === null) return

    if (res) {
      const statusToMake = plan.status === LearningPlanStatus.ACTIVE
        ? LearningPlanStatus.ARCHIVED : LearningPlanStatus.ACTIVE

      this.learningPlansService.changeStatus(plan.id, statusToMake)
      this.getPlans()
    }
  }

  handleAssignButtonClick(plan: LearningPlan) {
    this.learningPlanToAssign = plan
  }

  getPlans() {
    this.isLoading = true

    this.subscriptions['learningPlans'] = this.learningPlansService.getPlans(
      this.currentPage, 10, this.name
    ).subscribe((res) => {
      this.isLoading = false
      this.learningPlans = res.data.list
      this.total = res.data.total
    })
  }
}
