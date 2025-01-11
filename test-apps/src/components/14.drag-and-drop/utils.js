export function parseTodos(todos) {
    const updatedTodos = todos.map(todoItem => ({
        ...todoItem,
        status: todoItem.completed === true ? 'completed' : 'wip'
    }));
    return updatedTodos;
}