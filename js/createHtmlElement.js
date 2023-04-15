function createHtmlElement(options) {
  let elem = document.createElement(options.type)

  if (options.classList) {
    if (Array.isArray(options.classList)) {
      for (className of classList) {
        elem.classList.add(className)
      }
    } else {
      elem.classList.add(options.classList)
    }
  }

  if (options.children) {
    if (Array.isArray(options.children)) {
      elem.append(...options.children)
    } else {
      elem.append(options.children)
    }
  }

  if (options.id) {
    elem.id = options.id
  }
  return elem
}

export function createTodoElement(todo) {
  let obj = {}
  obj.checkbox = createHtmlElement({
    type: "button",
    classList: "todo-checkbox-button",
  })

  obj.contentWraper = createHtmlElement({
    type: "div",
    classList: "todo-content",
    children: todo.content,
  })

  obj.editButton = createHtmlElement({
    type: "button",
    classList: "edit-todo-button",
    children: "Edit",
  })

  obj.deleteButton = createHtmlElement({
    type: "button",
    classList: "delete-todo-button",
    children: "Delete",
  })

  obj.actionButtonWraper = createHtmlElement({
    type: "div",
    classList: "todo-action-button-wraper",
    children: [obj.editButton, obj.deleteButton],
  })

  obj.li = createHtmlElement({
    type: "li",
    classList: "todo",
    id: todo.id,
    children: [obj.checkbox, obj.contentWraper, obj.actionButtonWraper],
  })

  return obj
}
