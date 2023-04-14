import { Todo } from "./Todo.js"

const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoWraper = document.querySelector(".todo-wraper")

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // incrementOrder(1)
  let todo = new Todo(todoInput.value)
  todoInput.value = ""
  todoWraper.append(todo.elements.li)
})
