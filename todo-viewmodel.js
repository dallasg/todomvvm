export function addTodo(todos, title) {
    const newTodo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
    };
    return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function filterTodos(todos, filter) {
    if (filter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }
    if (filter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }
    return todos;
}
