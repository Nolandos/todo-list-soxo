import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoContainer from '@/components/todos/TodoContainer/TodoContainer';
import { Todo } from '@/lib/types';

describe('TodoContainer Integration Test', () => {
  const initialTodos: Todo[] = [
    { id: 1, title: 'Task 1 - Completed', completed: false, userId: 1 },
    { id: 2, title: 'Task 2 - Incomplete', completed: false, userId: 1 },
    { id: 3, title: 'Task 3 - Incomplete', completed: false, userId: 1 },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('should render the TodoContainer with all initial todos', () => {
    render(<TodoContainer initialTodos={initialTodos} />);

    expect(screen.getByText('Todo List')).toBeInTheDocument();

    expect(screen.getByText('Task 1 - Completed')).toBeInTheDocument();
    expect(screen.getByText('Task 2 - Incomplete')).toBeInTheDocument();
    expect(screen.getByText('Task 3 - Incomplete')).toBeInTheDocument();

    const filterElement = screen.getByRole('combobox', { name: /select task status/i });
    expect(filterElement).toBeInTheDocument();
  });

  test('should mark a todo as completed when clicked and store it in localStorage', async () => {
    render(<TodoContainer initialTodos={initialTodos} />);

    const firstTodoItemButton = screen.getByTestId('todo-item-1').querySelector('.MuiListItemButton-root');
    if (firstTodoItemButton) {
      fireEvent.click(firstTodoItemButton);
    }

    await waitFor(() => {
      const completedTodos = JSON.parse(localStorage.getItem('completedTodos') || '[]');
      expect(completedTodos).toContain(1);
    });

    const listItemText = screen.getByText('Task 1 - Completed').closest('.MuiListItemText-root');
    expect(listItemText).toHaveClass('line-through');
  });

  test('should filter todos correctly based on completion status', async () => {
    localStorage.setItem('completedTodos', JSON.stringify([1]));

    render(<TodoContainer initialTodos={initialTodos} />);

    expect(screen.getByText('Task 1 - Completed')).toBeInTheDocument();
    expect(screen.getByText('Task 2 - Incomplete')).toBeInTheDocument();
    expect(screen.getByText('Task 3 - Incomplete')).toBeInTheDocument();

    const filterSelect = screen.getByRole('combobox', { name: /select task status/i });
    fireEvent.mouseDown(filterSelect);

    await waitFor(() => {
      const completedOption = screen.getByRole('option', { name: /completed/i });
      fireEvent.click(completedOption);
    });

    await waitFor(() => {
      expect(screen.getByText('Task 1 - Completed')).toBeInTheDocument();

      expect(screen.queryByText('Task 2 - Incomplete')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 3 - Incomplete')).not.toBeInTheDocument();
    });

    const updatedFilterSelect = screen.getByRole('combobox', { name: /select task status/i });
    fireEvent.mouseDown(updatedFilterSelect);

    await waitFor(() => {
      const incompleteOption = screen.getByRole('option', { name: /incomplete/i });
      fireEvent.click(incompleteOption);
    });

    await waitFor(() => {
      expect(screen.queryByText('Task 1 - Completed')).not.toBeInTheDocument();

      expect(screen.getByText('Task 2 - Incomplete')).toBeInTheDocument();
      expect(screen.getByText('Task 3 - Incomplete')).toBeInTheDocument();
    });
  });

  test('should toggle todo completion status correctly', async () => {
    render(<TodoContainer initialTodos={initialTodos} />);

    const firstTodoItemButton = screen.getByTestId('todo-item-1').querySelector('.MuiListItemButton-root');
    if (firstTodoItemButton) {
      fireEvent.click(firstTodoItemButton);
    }

    await waitFor(() => {
      const completedItem = screen.getByText('Task 1 - Completed');
      const listItemText = completedItem.closest('.MuiListItemText-root');
      expect(listItemText).toHaveClass('line-through');
    });

    const completedTodoButton = screen.getByTestId('todo-item-1').querySelector('.MuiListItemButton-root');
    if (completedTodoButton) {
      fireEvent.click(completedTodoButton);
    }

    await waitFor(() => {
      const uncompletedItem = screen.getByText('Task 1 - Completed');
      const listItemText = uncompletedItem.closest('.MuiListItemText-root');
      expect(listItemText).not.toHaveClass('line-through');
    });
  });

  test('should display no tasks message when there are no todos', () => {
    render(<TodoContainer initialTodos={[]} />);

    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });

  test('should load more todos when Load More button is clicked', async () => {
    const manyTodos: Todo[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Task ${i + 1}`,
      completed: false,
      userId: 1
    }));

    render(<TodoContainer initialTodos={manyTodos} />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    const todoItemsBeforeLoadMore = screen.getAllByTestId(/^todo-item-\d+$/);
    const countBeforeLoadMore = todoItemsBeforeLoadMore.length;

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      const todoItemsAfterLoadMore = screen.getAllByTestId(/^todo-item-\d+$/);
      expect(todoItemsAfterLoadMore.length).toBeGreaterThan(countBeforeLoadMore);
    }, { timeout: 2000 });
  });
});
