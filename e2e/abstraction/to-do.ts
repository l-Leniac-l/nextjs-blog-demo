import { todoSelectors } from "e2e/tests/to-do/selectors"
import { taskList } from "./taksList"

const selectors = todoSelectors()

export const todo = {
  visit: () => {
    cy.visit("/to-do")
    cy.get("#__next").should("exist")
  },
  createDefaultList: () => {
    cy.get(selectors.createTaskInput).type(taskList.task1)
    cy.get(selectors.createTaskButton).click()
    cy.get(selectors.createTaskInput).type(taskList.task2)
    cy.get(selectors.createTaskButton).click()
    cy.get(selectors.createTaskInput).type(taskList.task3)
    cy.get(selectors.createTaskButton).click()
    cy.get(selectors.createTaskInput).type(taskList.task4)
    cy.get(selectors.createTaskButton).click()
  },
}
