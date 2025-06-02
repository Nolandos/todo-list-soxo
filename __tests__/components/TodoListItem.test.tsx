import { render, screen, fireEvent } from '@testing-library/react';
import TodoListItem from '@/components/todos/TodoListItem/TodoListItem';
import * as TodoContext from '@/context/TodoContext';

jest.mock('@/context/TodoContext', () => ({
  useTodos: jest.fn()
}));

describe('TodoListItem', () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      toggleTodoCompletion: mockToggle
    });
  });

  test('should render todo item with correct content', () => {
    const todo = { id: 1, title: 'Test Task', completed: false };

    render(<TodoListItem todo={todo} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
  });

  test('should apply line-through class when todo is completed', () => {
    const todo = { id: 1, title: 'Test Task', completed: true };

    render(<TodoListItem todo={todo} />);

    const listItemText = screen.getByText('Test Task').closest('.MuiListItemText-root');
    expect(listItemText).toHaveClass('line-through');
  });

  test('should call toggleTodoCompletion when clicked', () => {
    const todo = { id: 1, title: 'Test Task', completed: false };

    render(<TodoListItem todo={todo} />);


    const listItemButton = document.querySelector('.MuiListItemButton-root');
    if (listItemButton) {
      fireEvent.click(listItemButton);
      expect(mockToggle).toHaveBeenCalledWith(1);
    } else {

      fireEvent.click(screen.getByTestId('todo-item-1'));
      expect(mockToggle).toHaveBeenCalledWith(1);
    }
  });
});
