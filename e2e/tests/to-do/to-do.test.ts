import { taskList } from "e2e/abstraction/taksList"
import { todo } from "e2e/abstraction/to-do"
import { todoSelectors } from "./selectors"

const selectors = todoSelectors()

describe("TO-DO: to-do component", () => {
  beforeEach(() => {
    // Visite a página to-do
    cy.visit("/to-do")
  })

  it("Create task", () => {
    // A lista tem que estar vazia
    cy.get(selectors.taskList).should("not.exist")

    // Crie uma task
    cy.get(selectors.createTaskInput).type("Alou")
    cy.get(selectors.createTaskButton).click()

    // A lista deve ter 1 elemento
    cy.get(selectors.taskList).children().should("have.length", 1)
  })

  it("Check and uncheck tasks", () => {
    todo.createDefaultList()

    // Clica no primeiro elemento da lista
    cy.get(selectors.task).first().click()

    // Teremos 1 tarefa marcada
    cy.get(selectors.taskChecked).should("have.length", 1)

    // Clica no ultimo elemento
    cy.get(selectors.task).last().click()

    // Teremos 2 tarefas marcadas
    cy.get(selectors.taskChecked).should("have.length", 2)

    // Clica no primeiro elemento
    cy.get(selectors.task).first().click()

    // Teremos 1 tarefas marcadas
    cy.get(selectors.taskChecked).should("have.length", 1)
  })

  it("Delete tasks", () => {
    todo.createDefaultList()

    // A tarefa deve existir
    cy.get(selectors.task).first().should("have.text", taskList.task1)

    // Deleta a primeira tarefa
    cy.get(selectors.taskDeleteButton).first().click()

    // A tarefa não deve mais existir
    cy.get(selectors.task).first().should("not.have.text", taskList.task1)

    // A tarefa deve existir
    cy.get(selectors.task).last().should("have.text", taskList.task4)

    // Deleta a primeira tarefa
    cy.get(selectors.taskDeleteButton).last().click()

    // A tarefa não deve mais existir
    cy.get(selectors.task).last().should("not.have.text", taskList.task4)
  })
})
