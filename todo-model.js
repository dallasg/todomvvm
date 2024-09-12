import { z } from 'zod';

// Define a Zod schema for a Todo item
export const TodoModel = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, 'Title is required'),
    completed: z.boolean(),
});

// Create a factory function to generate a new Todo
export const createTodo = (title) => {
    const newTodo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
    };

    // Validate the Todo using Zod
    const parsed = TodoModel.safeParse(newTodo);
    if (!parsed.success) {
        throw new Error(parsed.error.issues.map(issue => issue.message).join(', '));
    }

    return parsed.data;
};
