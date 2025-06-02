'use client';

import {createContext, useContext, useState, ReactNode, useEffect, useCallback} from 'react';
import { Todo } from '@/lib/types';
import {TodoStatusFilters} from "@/lib/enums";

interface TodoContextType {
    todosList: Todo[];
    toggleTodoCompletion: (id: number) => void;
    currentFilter: TodoStatusFilters;
    setFilter: (filter: TodoStatusFilters) => void;
    paginationSize: number;
    loadMore: () => void;
    total: number;
    loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);


const safeLocalStorageGet = (key: string, defaultValue: number[] |  null = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

const safeLocalStorageSet = (key: string, value: number[] |  null) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
    }
}

export function TodoProvider({
                                 children,
                                 initialTodos,
                             }: {
    children: ReactNode;
    initialTodos: Todo[];
}) {
    const defaultPaginationSize: number = 10;
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState<number>(initialTodos?.length || 0)
    const [todosList, setTodosList] = useState<Todo[]>([]);
    const [currentFilter, setCurrentFilter] = useState<TodoStatusFilters>(TodoStatusFilters.ALL);
    const [paginationSize, setPaginationSize] = useState<number>(defaultPaginationSize);

    const handleFilterStatusTodoList = (todosToFilter: Todo[], applyFilter: TodoStatusFilters) => {
        return todosToFilter.filter(todo => {
            if (applyFilter === TodoStatusFilters.ALL) return true;
            if (applyFilter === TodoStatusFilters.COMPLETED) return todo.completed;
            if (applyFilter === TodoStatusFilters.INCOMPLETE) return !todo.completed;
            return true;
        });
    }

    const handleSetTaskStatus = (baseTodos:Todo[], localStorageCompleteTodosList: number[], statusFilter:TodoStatusFilters, paginationSize: number) => {
        const setTaskStatus = baseTodos.map((baseTodo) => {
            if(localStorageCompleteTodosList.includes(baseTodo.id)) return ({...baseTodo, completed: true});
            else return ({...baseTodo, completed: false})
        });

        const filteredTasks = handleFilterStatusTodoList(setTaskStatus, statusFilter);

        setTotal(filteredTasks.length);
        setTodosList(filteredTasks.slice(0, paginationSize));
        setLoading(false);
    }


    const toggleTodoCompletion = useCallback((id: number) => {
        const completedTodos: number[] = safeLocalStorageGet('completedTodos', []);
        const isCompleted = completedTodos.includes(id);

        let updatedCompletedTodos: number[];

        if (isCompleted) {
            updatedCompletedTodos = completedTodos.filter(todoId => todoId !== id);
        } else {
            updatedCompletedTodos = [...completedTodos, id];
        }

        safeLocalStorageSet('completedTodos', updatedCompletedTodos);

        handleSetTaskStatus(initialTodos, updatedCompletedTodos, currentFilter, paginationSize);
    }, [initialTodos, currentFilter, paginationSize]);

    const setFilter = useCallback((filter: TodoStatusFilters) => {
        setPaginationSize(defaultPaginationSize);
        setCurrentFilter(filter);
    }, []);

    const loadMore = useCallback(() => {
        const newPaginationSize = paginationSize + defaultPaginationSize;
        if(newPaginationSize <= initialTodos?.length) {
            setPaginationSize(newPaginationSize);
        }
    }, [paginationSize, initialTodos, defaultPaginationSize]);

    useEffect(() => {
        const parseCompletedTodos: number[] = safeLocalStorageGet('completedTodos', []);
        handleSetTaskStatus(initialTodos, parseCompletedTodos, currentFilter, paginationSize);
    }, [initialTodos, currentFilter, paginationSize]);

    const value: TodoContextType = {
        todosList,
        toggleTodoCompletion,
        currentFilter,
        setFilter,
        paginationSize,
        total,
        loadMore,
        loading
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}
