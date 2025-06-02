import { render, screen } from '@testing-library/react';
import TodoList from '@/components/todos/TodoList/TodoList';
import * as TodoContext from '@/context/TodoContext';
import {Todo} from "@/lib/types";

jest.mock('@/context/TodoContext', () => ({
    useTodos: jest.fn()
}));

jest.mock('@mui/material/CircularProgress', () => {
    return function MockCircularProgress() {
        return <div data-testid="loading-spinner">Loading...</div>;
    };
});

jest.mock('@/components/todos/TodoListItem/TodoListItem', () => {
    return function MockTodoListItem({ todo }: { todo: Todo }) {
        return <div data-testid={`todo-item-${todo.id}`}>{todo.title}</div>;
    };
});

jest.mock('@/components/todos/TodoNoTaskInfo/TodoNoTaskInfo', () => {
    return function MockNoTaskInfo() {
        return <div data-testid="no-task-info">No tasks</div>;
    };
});

describe('TodoList', () => {
    test('should display loading spinner when loading', () => {
        (TodoContext.useTodos as jest.Mock).mockReturnValue({
            todosList: [],
            loading: true
        });

        render(<TodoList />);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('should display todo items when not loading', () => {
        const mockTodos = [
            { id: 1, title: 'Test Todo 1', completed: false },
            { id: 2, title: 'Test Todo 2', completed: true }
        ];

        (TodoContext.useTodos as jest.Mock).mockReturnValue({
            todosList: mockTodos,
            loading: false
        });

        render(<TodoList />);

        expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    });

    test('should display "no tasks" message when todosList is empty', () => {
        (TodoContext.useTodos as jest.Mock).mockReturnValue({
            todosList: [],
            loading: false
        });

        render(<TodoList />);

        expect(screen.getByTestId('no-task-info')).toBeInTheDocument();
    });
});
