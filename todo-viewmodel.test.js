import { describe, it, expect, vi } from 'vitest';
import { addTodo, toggleTodo, deleteTodo, filterTodos } from './todo-viewmodel';

vi.spyOn(global.crypto, 'randomUUID').mockReturnValue('1234-5678-uuid');

describe('TodoViewModel', () => {
    it('should add a new todo', () => {
        const todos = [];
        const updatedTodos = addTodo(todos, 'Test Todo');

        expect(updatedTodos.length).toBe(1);
        expect(updatedTodos[0].title).toBe('Test Todo');
        expect(updatedTodos[0].completed).toBe(false);
        expect(updatedTodos[0].id).toBe('1234-5678-uuid');
    });

    it('should toggle a todo\'s completed state', () => {
        const todos = [{ id: '1234-5678-uuid', title: 'Test Todo', completed: false }];
        const updatedTodos = toggleTodo(todos, '1234-5678-uuid');

        expect(updatedTodos[0].completed).toBe(true);
    });

    it('should delete a todo', () => {
        const todos = [{ id: '1234-5678-uuid', title: 'Test Todo', completed: false }];
        const updatedTodos = deleteTodo(todos, '1234-5678-uuid');

        expect(updatedTodos.length).toBe(0);
    });

    it('should filter todos by "completed" state', () => {
        const todos = [
            { id: '1', title: 'Active Todo', completed: false },
            { id: '2', title: 'Completed Todo', completed: true }
        ];
        const completedTodos = filterTodos(todos, 'completed');

        expect(completedTodos.length).toBe(1);
        expect(completedTodos[0].title).toBe('Completed Todo');
    });

    it('should filter todos by "active" state', () => {
        const todos = [
            { id: '1', title: 'Active Todo', completed: false },
            { id: '2', title: 'Completed Todo', completed: true }
        ];
        const activeTodos = filterTodos(todos, 'active');

        expect(activeTodos.length).toBe(1);
        expect(activeTodos[0].title).toBe('Active Todo');
    });
});
