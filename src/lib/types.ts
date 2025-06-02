export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoContextType {
    todos: Todo[];
    filter: TodoFilter;
    filteredTodos: Todo[];
    isLoading: boolean;
    error: string | null;
    toggleTodo: (id: string) => void;
    setFilter: (filter: TodoFilter) => void;
}
