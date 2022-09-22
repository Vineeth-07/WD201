let todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo test cases", () => {
  test("Adding new todo", () => {
    expect(all.length).toEqual(0);
    add({
      title: "Complete project",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toEqual(1);
  });

  test("Todo markas completed", () => {
    expect(all.length).toEqual(1);
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Test for over due", () => {
    expect(all.length).toEqual(1);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "Go for shopping",
      completed: false,
      dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(2);
    overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });

  test("Test for due today", () => {
    expect(all.length).toEqual(2);
    const today = new Date();
    add({
      title: "Take the exam",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    expect(all.length).toEqual(3);
    dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(2);
  });

  test("Test for due later", () => {
    expect(all.length).toEqual(3);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "Should complete home work",
      completed: false,
      dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(4);
    dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
  });
});