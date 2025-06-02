import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoProvider, useTodos } from '@/context/TodoContext';
import { Todo } from "@/lib/types";
import { TodoStatusFilters } from '@/lib/enums';

const LoadMoreTestComponent = () => {
    const { paginationSize, total, loadMore } = useTodos();

    return (
        <div>
            <div data-testid="pagination-size">{paginationSize}</div>
            <div data-testid="total">{total}</div>
            <button data-testid="load-more" onClick={() => loadMore()}>
                Load More
            </button>
        </div>
    );
};

const FilteredTestComponent = () => {
    const { todosList, currentFilter, setFilter } = useTodos();

    return (
        <div>
            <div data-testid="todos-list">{JSON.stringify(todosList)}</div>
            <div data-testid="current-filter">{currentFilter}</div>
            <button data-testid="filter-all" onClick={() => setFilter(TodoStatusFilters.ALL)}>All</button>
            <button data-testid="filter-completed" onClick={() => setFilter(TodoStatusFilters.COMPLETED)}>Completed</button>
            <button data-testid="filter-incomplete" onClick={() => setFilter(TodoStatusFilters.INCOMPLETE)}>Incomplete</button>
        </div>
    );
};

describe('TodoContext - Pagination and Filtering', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('loadMore function', () => {
        test('should increase paginationSize when loadMore is called', () => {
            const initialTodos: Todo[] = Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                title: `Todo ${i + 1}`,
                completed: false,
                userId: 1
            }));

            render(
                <TodoProvider initialTodos={initialTodos}>
                    <LoadMoreTestComponent />
                </TodoProvider>
            );


            expect(screen.getByTestId('pagination-size').textContent).toBe('10');


            expect(screen.getByTestId('total').textContent).toBe('20');


            fireEvent.click(screen.getByTestId('load-more'));

            expect(screen.getByTestId('pagination-size').textContent).toBe('20');
        });

        test('should not increase paginationSize beyond initialTodos length', () => {
            const initialTodos: Todo[] = Array.from({ length: 15 }, (_, i) => ({
                id: i + 1,
                title: `Todo ${i + 1}`,
                completed: false,
                userId: 1
            }));

            render(
                <TodoProvider initialTodos={initialTodos}>
                    <LoadMoreTestComponent />
                </TodoProvider>
            );

            expect(screen.getByTestId('pagination-size').textContent).toBe('10');

            expect(screen.getByTestId('total').textContent).toBe('15');


            fireEvent.click(screen.getByTestId('load-more'));

            expect(screen.getByTestId('pagination-size').textContent).toBe('10');
        });
    });

    describe('filtering behavior', () => {
        test('should filter todos correctly for each filter type', async () => {
            localStorage.setItem('completedTodos', JSON.stringify([2, 4]));

            const initialTodos: Todo[] = [
                { id: 1, title: 'Todo 1', completed: false, userId: 1 },
                { id: 2, title: 'Todo 2', completed: false, userId: 1 },
                { id: 3, title: 'Todo 3', completed: false, userId: 1 },
                { id: 4, title: 'Todo 4', completed: false, userId: 1 },
            ];

            render(
                <TodoProvider initialTodos={initialTodos}>
                    <FilteredTestComponent />
                </TodoProvider>
            );

            await waitFor(() => {
                const todosList = JSON.parse(screen.getByTestId('todos-list').textContent || '[]');
                expect(todosList.length).toBe(4);
            });

            fireEvent.click(screen.getByTestId('filter-completed'));


            await waitFor(() => {
                const todosList = JSON.parse(screen.getByTestId('todos-list').textContent || '[]');
                expect(todosList.length).toBe(2);
                expect(todosList.every((todo: Todo) => todo.completed)).toBe(true);
                expect(todosList.map((todo: Todo) => todo.id)).toContain(2);
                expect(todosList.map((todo: Todo) => todo.id)).toContain(4);
            });


            fireEvent.click(screen.getByTestId('filter-incomplete'));

            await waitFor(() => {
                const todosList = JSON.parse(screen.getByTestId('todos-list').textContent || '[]');
                expect(todosList.length).toBe(2);
                expect(todosList.every((todo: Todo) => !todo.completed)).toBe(true);
                expect(todosList.map((todo: Todo) => todo.id)).toContain(1);
                expect(todosList.map((todo: Todo) => todo.id)).toContain(3);
            });
        });
    });
});
