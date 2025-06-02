import { render, screen } from '@testing-library/react';
import TodoNoTaskInfo from '@/components/todos/TodoNoTaskInfo/TodoNoTaskInfo';

jest.mock('@mui/icons-material/Warning', () => {
  return function MockWarningIcon() {
    return <div data-testid="warning-icon">Warning</div>;
  };
});

describe('TodoNoTaskInfo', () => {
  test('should render no tasks message with icon', () => {
    render(<TodoNoTaskInfo />);

    expect(screen.getByTestId('no-task-info')).toBeInTheDocument();

    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();

    expect(screen.getByText('No tasks found')).toBeInTheDocument();
  });
});
