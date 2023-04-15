import { Todo } from "./Todo.js"
import { createTodoElement } from "./CreateHtmlElement.js"

const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoWraper = document.querySelector(".todo-wraper")
const clearAllTodoButton = document.querySelector(".clear-all-todo-button")
const clearDoneTodoButton = document.querySelector(".clear-done-todo-button")
const clearPendingTodoButton = document.querySelector(
  ".clear-pending-todo-button"
)
const totalTodoDisplay = document.querySelector(".total-todo-display")
const doneTodoDisplay = document.querySelector(".done-todo-display")
const pendingTodoDisplay = document.querySelector(".pending-todo-display")
const LOCAL_TODO_KEY = "test"

// functions

function incrementTodoOrder() {
  for (let todo of todoArray) {
    todo.order++
  }
}

function addLeadingZero(n) {
  return n < 10 ? `0${n}` : n
}

function setLocalTodo() {
  localStorage.setItem(LOCAL_TODO_KEY, JSON.stringify(todoArray))
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

function calculateSpacing() {
  let documentStyles = getComputedStyle(document.documentElement)
  let remValue = documentStyles.getPropertyValue("--spacing-400").slice(0, -3)
  return convertRemToPixels(remValue)
}

function populateTodo(todo, prepend = true) {
  let elements = { ...createTodoElement(todo) }
  elements.li.classList.toggle("done", todo.done)
  elements.deleteButton.addEventListener("click", () => {
    deleteTodo(todo, elements.li)
  })
  elements.editButton.addEventListener("click", () => {
    editTodo(todo, elements)
  })
  elements.checkbox.addEventListener("click", () => {
    doUndo(todo, elements.li)
  })
  if (prepend) {
    todoWraper.prepend(elements.li)
  } else {
    todoWraper.append(elements.li)
  }
}

function deleteTodo(todo, li) {
  li.remove()
  todoArray.splice(todoArray.indexOf(todo), 1)
  placeTodo()
}

function editTodo(todo, elements) {
  if (!todo.editing) {
    todo.editing = true
    elements.contentWraper.contentEditable = true
    elements.contentWraper.focus()
    elements.editButton.textContent = "save"
    resizeObserver.observe(elements.li)
  } else {
    todo.editing = false
    elements.contentWraper.contentEditable = false
    elements.editButton.textContent = "edit"
    todo.content = elements.contentWraper.textContent
    resizeObserver.disconnect()
    placeTodo()
  }
}

function doUndo(todo, li) {
  if (!todo.done) {
    todo.done = true
  } else {
    todo.done = false
  }

  li.classList.toggle("done", todo.done)
  placeTodo()
}

function setTop(spacing) {
  let top = 0
  todoArray.forEach((todo, i) => {
    todo.order = i
    let todoLi = document.querySelector(`#${todo.id}`)
    todoLi.style.setProperty("--top", top + "px")
    top += todoLi.getBoundingClientRect().height + spacing
  })
  todoWraper.style.setProperty("height", top + "px")
}

function placeTodo() {
  let spacing = calculateSpacing()
  totalTodoDisplay.textContent = addLeadingZero(todoArray.length)
  pendingTodoDisplay.textContent = addLeadingZero(
    todoArray.filter((todo) => !todo.done).length
  )
  doneTodoDisplay.textContent = addLeadingZero(
    todoArray.filter((todo) => todo.done).length
  )
  //   newArray = todoArray.filter((todo) => {
  //     return !todo.done
  //   })
  //   break
  // case "pending":
  //   newArray = todoArray.filter((todo) => {
  //     return todo.done
  //   })
  setTop(spacing)
  setLocalTodo()
}

function clearTodo(type) {
  let newArray
  switch (type) {
    case "all":
      newArray = []
      break
    case "done":
      newArray = todoArray.filter((todo) => {
        return !todo.done
      })
      break
    case "pending":
      newArray = todoArray.filter((todo) => {
        return todo.done
      })
      break
  }
  todoArray.forEach((todo) => {
    if (newArray.indexOf(todo) == -1) {
      document.querySelector(`#${todo.id}`).remove()
    }
  })
  todoArray = newArray
  placeTodo()
}

// execution
let storedTodo = localStorage.getItem(LOCAL_TODO_KEY)
let todoArray = storedTodo ? JSON.parse(storedTodo) : []

const resizeObserver = new ResizeObserver((entries) => {
  placeTodo()
})
window.addEventListener("resize", placeTodo)

todoArray.forEach((todo) => {
  populateTodo(todo, false)
})
placeTodo()

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (todoInput.value == "") return
  incrementTodoOrder()
  let todo = new Todo(todoInput.value)
  todoInput.value = ""
  todoArray.unshift(todo)
  populateTodo(todo)
  placeTodo()
})

clearAllTodoButton.addEventListener("click", () => {
  clearTodo("all")
})

clearDoneTodoButton.addEventListener("click", () => {
  clearTodo("done")
})

clearPendingTodoButton.addEventListener("click", () => {
  clearTodo("pending")
})
