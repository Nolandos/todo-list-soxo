import { fetchTodos, ApiError } from '@/lib/backend/api';
import { API_URL } from '@/lib/constants';

global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchTodos should return todos when API call succeeds', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true }
    ];

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockTodos)
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const todos = await fetchTodos();

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, expect.any(Object));

    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe('Test Todo 1');
  });

  test('fetchTodos should throw ApiError when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Server error'
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(fetchTodos()).rejects.toThrow(ApiError);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, expect.any(Object));
  });

  test('fetchTodos should throw ApiError when data is invalid', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(null)
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(fetchTodos()).rejects.toThrow(ApiError);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, expect.any(Object));
  });

  test('fetchTodos should throw ApiError when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchTodos()).rejects.toThrow(ApiError);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, expect.any(Object));
  });
});
