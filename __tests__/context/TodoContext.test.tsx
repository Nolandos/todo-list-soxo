import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoProvider, useTodos } from '@/context/TodoContext';
import { TodoStatusFilters } from '@/lib/enums';
import {Todo} from "@/lib/types";

const TestComponent = () => {
    const { todosList, toggleTodoCompletion, currentFilter, setFilter } = useTodos();

    return (
        <div>
            <div data-testid="todos-count">{todosList.length}</div>
            <button
                data-testid="toggle-todo"
                onClick={() => toggleTodoCompletion(1)}
            >
                Toggle
            </button>
            <div data-testid="current-filter">{currentFilter}</div>
            <button
                data-testid="set-completed-filter"
                onClick={() => setFilter(TodoStatusFilters.COMPLETED)}
            >
                Show Completed
            </button>
        </div>
    );
};

describe('TodoContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should provide initial todos', () => {
        const initialTodos:Todo[] = [
            { id: 1, title: 'Test Todo', completed: false, userId: 58 }
        ];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <TestComponent />
            </TodoProvider>
        );

        expect(screen.getByTestId('todos-count').textContent).toBe('1');
    });

    test('should toggle todo completion', async () => {
        const initialTodos:Todo[] = [
            { id: 1, title: 'Test Todo', completed: false, userId: 58 }
        ];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByTestId('toggle-todo'));

        await waitFor(() => {
            const completedTodos = JSON.parse(localStorage.getItem('completedTodos') || '[]');
            expect(completedTodos).toContain(1);
        });
    });

    test('should filter todos', () => {
        const initialTodos:Todo[] = [
            { id: 1, title: 'Todo 1', completed: false, userId: 58 },
            { id: 2, title: 'Todo 2', completed: true, userId: 2 }
        ];

        render(
            <TodoProvider initialTodos={initialTodos}>
                <TestComponent />
            </TodoProvider>
        );

        expect(screen.getByTestId('todos-count').textContent).toBe('2');

        fireEvent.click(screen.getByTestId('set-completed-filter'));

        expect(screen.getByTestId('current-filter').textContent).toBe(TodoStatusFilters.COMPLETED);
    });
});
