export class TodoListService {
  todolist = ["todo 1", "todo 2", "todo 3"];

  getJsonTodoList() {
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todolist.map((value, index) => {
        return {
          id: index,
          todo: value,
        };
      }),
    });
  }

  getTodoList(req, res) {
    res.write(this.getJsonTodoList());
    res.end();
  }

  createTodoList(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      const todo = body?.todo;

      if (todo) this.todolist.push(todo);

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  updateTodoList(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      const id = body?.id;
      const todo = body?.todo;

      if (id >= 0 && todo && this.todolist[id]) {
        this.todolist.splice(id, 1, todo);
      }

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  deleteTodoList(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      const id = body?.id;

      if (id >= 0 && this.todolist[id]) {
        this.todolist.splice(id, 1);
      }

      res.write(this.getJsonTodoList());
      res.end();
    });
  }
}
