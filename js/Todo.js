import { createTodoElement } from "./CreateHtmlElement.js"

export class Todo {
  constructor(content) {
    this.content = content
    this.order = 0
    this.done = false
    this.elements = createTodoElement(content)
    console.log(this.elements.li)
  }
}
