import { render, screen, fireEvent } from '@testing-library/react';
import TodoLoadMoreButton from '@/components/todos/TodoLoadMoreButton/TodoLoadMoreButton';
import * as TodoContext from '@/context/TodoContext';

jest.mock('@/context/TodoContext', () => ({
  useTodos: jest.fn()
}));

describe('TodoLoadMoreButton', () => {
  const mockLoadMore = jest.fn();
  
  test('should render load more button when there are more todos to load', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      paginationSize: 10,
      total: 20,
      loadMore: mockLoadMore
    });
    
    render(<TodoLoadMoreButton />);
    
    const button = screen.getByText('Load more');
    expect(button).toBeInTheDocument();
  });
  
  test('should not render load more button when all todos are loaded', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      paginationSize: 20,
      total: 20,
      loadMore: mockLoadMore
    });
    
    render(<TodoLoadMoreButton />);
    
    const button = screen.queryByText('Load more');
    expect(button).not.toBeInTheDocument();
  });
  
  test('should call loadMore function when button is clicked', () => {
    (TodoContext.useTodos as jest.Mock).mockReturnValue({
      paginationSize: 10,
      total: 20,
      loadMore: mockLoadMore
    });
    
    render(<TodoLoadMoreButton />);
    
    const button = screen.getByText('Load more');
    fireEvent.click(button);
    
    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});
