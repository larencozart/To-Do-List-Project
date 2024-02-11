const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // size
  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  // toArray
  test("toArray returns list object as an array", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  // first
  test("first returns first todo object", () => {
    expect(list.first()).toEqual(todo1);
  });

  // last
  test("last returns last todo object", () => {
    expect(list.last()).toEqual(todo3);
  });

  // shift
  test("shift removes and returns the first item in list", () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  // pop
  test("pop removes and returns the last item in list", () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  // isDone
  test("isDone returns true when all items in the list are done, false otherwise", () => {
    expect(list.isDone()).toBe(false);

    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  // add
  test("add will throw a TypeError if passed an argument that is not a todo object", () => {
    let number = 1;
    let string = 'string';
    let object = new TodoList();
    expect(() => list.add(number)).toThrow(TypeError);
    expect(() => list.add(string)).toThrow(TypeError);
    expect(() => list.add(object)).toThrow(TypeError);
  });

  // itemAt
  test("itemAt returns the item at given index", () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
    expect(() => list.itemAt(undefined)).toThrow(ReferenceError);
  });

  // markDoneAt
  test("markDoneAt marks the item at given index as done", () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
    expect(() => list.markDoneAt(undefined)).toThrow(ReferenceError);
  });

  // markUndoneAt
  test("markUndoneAt marks the item at given index as done", () => {
    list.markAllDone();
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);

    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);
    expect(() => list.markUndoneAt(undefined)).toThrow(ReferenceError);
  });

  // markAllDone
  test("markAllDone marks all items in the list as done", () => {
    list.markAllDone();
    expect(list.toArray().every(todo => todo.isDone())).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  // removeAt
  test("removeAt removes and returns the item at a given index", () => {
    expect(list.removeAt(1)).toBe(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt(3)).toThrow(ReferenceError);
    expect(() => list.removeAt(undefined)).toThrow(ReferenceError);
  });

  // toString p1
  test('toString returns string representation of the list', () => {
    let expectedString = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(expectedString);
  });

  // toString p2
  test("toString returns different string for done todo", () => {
    todo1.markDone();

    let expectedString = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(expectedString);
  });

  // toString p3
  test("toString returns different string for all done todos", () => {
    list.markAllDone();

    let expectedString = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(expectedString);
  });

  // forEach
  test("forEach iterates over every element in list", () => {
    let visitedItems = 0;
    list.forEach(_item => visitedItems += 1);
    expect(visitedItems).toBe(3);
  });

  // filter
  test("filter selects specific items and returns them in a new Todo list", () => {
    todo1.markDone();
    todo2.markDone();
    let doneItems = list.filter(item => item.isDone());

    expect(doneItems instanceof TodoList).toBe(true);
    expect(doneItems.toArray()).toEqual([todo1, todo2]);
  });

  // findByTitle
  test("findByTitle returns the first todo item with a given title in a list", () => {
    expect(list.findByTitle("Buy milk")).toEqual(todo1);
  });

  // allDone
  test("allDone returns a new Todo list with all done todo items", () => {
    todo1.markDone();
    let doneTodos = list.allDone();
    
    expect(doneTodos instanceof TodoList).toBe(true);
    expect(doneTodos.toArray()).toEqual([todo1]);
  });

   // allNotDone
  test("allNotDone returns a new Todo list with all unfinished todo items", () => {
    todo1.markDone();
    let unfinishedTodos = list.allNotDone();
    
    expect(unfinishedTodos instanceof TodoList).toBe(true);
    expect(unfinishedTodos.toArray()).toEqual([todo2, todo3]);
  });

  // markDone
  test("markDone marks an item with a given title as done", () => {
    list.markDone("Buy milk");
    expect(todo1.isDone()).toBe(true);
  });

  // markAllUndone
  test("markAllUndone marks all items in the list as not done", () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    list.markAllUndone();

    expect(list.toArray().every(todo => !todo.isDone())).toBe(true);
    expect(list.isDone()).toBe(false);
  });
});