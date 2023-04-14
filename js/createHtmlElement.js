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
      for (let child of options.children) {
        elem.append(child)
      }
    } else {
      elem.append(options.children)
    }
  }
  return elem
}

export function createTodoElement(content) {
  let obj = {}
  obj.checkbox = createHtmlElement({
    type: "button",
    classList: "todo-checkbox-button",
  })

  obj.contentWraper = createHtmlElement({
    type: "div",
    classList: "todo-content",
    children: content,
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
    children: [obj.checkbox, obj.contentWraper, obj.actionButtonWraper],
  })

  return obj
}
