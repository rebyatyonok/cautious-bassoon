import faker from 'faker'

import { LearningPlan, LearningPlanStatus, User } from "../models"

export const learningPlan = (): LearningPlan => ({
  id: faker.datatype.number(),
  name: faker.lorem.words(2),
  status: faker.random.arrayElement(Object.values(LearningPlanStatus))
})

export const learningPlans = Array.from({ length: 20 }).map(e => learningPlan())

export const getUser = (): User => {
  const name = faker.name.firstName()
  const haveLearningPlans = faker.datatype.boolean()

  return {
    id: faker.datatype.number(),
    avatar: `https://randomuser.me/api/portraits/women/${faker.datatype.number(100)}.jpg`,
    email: faker.internet.email(name),
    learningPlans: haveLearningPlans ? faker.random.arrayElements(learningPlans, faker.datatype.number(5)) : [],
    name,
  }
}

export const users = Array.from({ length: 20 }).map(e => getUser())
