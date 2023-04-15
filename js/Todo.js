export class Todo {
  constructor(content) {
    this.content = content
    this.order = 0
    this.done = false
    this.editing = false
    this.id = `t${new Date().getTime()}`
  }
}
