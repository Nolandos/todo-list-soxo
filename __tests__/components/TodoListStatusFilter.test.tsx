import { render, screen, fireEvent } from '@testing-library/react';
import TodoListStatusFilter from '@/components/todos/TodoListStatusFilter/TodoListStatusFilter';
import * as TodoContext from '@/context/TodoContext';
import { TodoStatusFilters } from '@/lib/enums';

jest.mock('@/context/TodoContext', () => ({
  useTodos: jest.fn()
}));

describe('TodoListStatusFilter', () => {
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display filter with correct initial value', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      currentFilter: TodoStatusFilters.ALL,
      setFilter: mockSetFilter
    });

    render(<TodoListStatusFilter />);


    expect(screen.getByRole('combobox')).toHaveTextContent('All');
  });

  test('should call setFilter with COMPLETED when changing filter to Completed', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      currentFilter: TodoStatusFilters.ALL,
      setFilter: mockSetFilter
    });

    render(<TodoListStatusFilter />);

    const selectInput = screen.getByDisplayValue('ALL');
    fireEvent.change(selectInput, { target: { value: TodoStatusFilters.COMPLETED } });

    expect(mockSetFilter).toHaveBeenCalledWith(TodoStatusFilters.COMPLETED);
  });

  test('should call setFilter with INCOMPLETE when changing filter to Incomplete', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      currentFilter: TodoStatusFilters.ALL,
      setFilter: mockSetFilter
    });

    render(<TodoListStatusFilter />);

    const selectInput = screen.getByDisplayValue('ALL');
    fireEvent.change(selectInput, { target: { value: TodoStatusFilters.INCOMPLETE } });

    expect(mockSetFilter).toHaveBeenCalledWith(TodoStatusFilters.INCOMPLETE);
  });

  test('should show current filter in the select', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      currentFilter: TodoStatusFilters.COMPLETED,
      setFilter: mockSetFilter
    });

    render(<TodoListStatusFilter />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Completed');
  });
});
