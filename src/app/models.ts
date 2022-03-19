export type User = {
  id: number
  avatar?: string
  name: string
  email: string
  learningPlans: LearningPlan[]
}

export enum LearningPlanStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

export type LearningPlan = {
  id: number
  name: string
  status: LearningPlanStatus
}
