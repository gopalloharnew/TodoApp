import { Todo } from "./Todo.js"

const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoWraper = document.querySelector(".todo-wraper")
const clearAllTodoButton = document.querySelector(".clear-all-todo-button")
const clearDoneTodoButton = document.querySelector(".clear-done-todo-button")
const clearPendingTodoButton = document.querySelector(
  ".clear-pending-todo-button"
)

let todoArray = []

let mutationObserver = new MutationObserver((entries) => {
  mutationObserver.disconnect()
  placeTodo()
  mutationObserver.observe(todoWraper, { childList: true })
})
mutationObserver.observe(todoWraper, { childList: true })

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // incrementOrder(1)
  incrementTodoOrder()
  let todo = new Todo(todoInput.value)
  todoInput.value = ""
  todoWraper.append(todo.elements.li)
  todoArray.push(todo)
})

function incrementTodoOrder() {
  for (let todo of todoArray) {
    todo.order++
  }
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

function placeTodo() {
  let orderMax = todoArray.length
  for (let todo of todoArray) {
    if (todo.done) {
      todo.order = orderMax
      orderMax++
    }
  }

  todoArray.sort((firstTodo, secondTodo) => {
    return firstTodo.order - secondTodo.order
  })

  // get 0.5
  let spacing = convertRemToPixels(
    parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--spacing-400")
        .slice(0, -3)
    )
  )
  todoWraper.innerHTML = ""
  let elementTop = 0
  for (let i = 0; i < todoArray.length; i++) {
    const todo = todoArray[i]
    todo.order = i
    todoWraper.append(todo.elements.li)
    todo.elements.li.style.setProperty("--top", elementTop + "px")
    // for next
    elementTop += todo.elements.li.getBoundingClientRect().height + spacing
  }
  todoWraper.style.setProperty("height", elementTop + "px")
}
