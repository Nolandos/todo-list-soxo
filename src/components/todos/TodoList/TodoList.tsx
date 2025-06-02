'use client';

import {FC} from "react";
import List from '@mui/material/List';
import {useTodos} from "@/context/TodoContext";
import TodoListItem from "@/components/todos/TodoListItem/TodoListItem";
import {Paper} from "@mui/material";
import TodoNoTaskInfo from "@/components/todos/TodoNoTaskInfo/TodoNoTaskInfo";
import CircularProgress from "@mui/material/CircularProgress";


const TodoList:FC = () => {
    const {todosList, loading} = useTodos();

    return (
        <Paper elevation={3} className="min-h-[670px] flex flex-col" data-testid="todo-list-container">
            {loading && (
                <div className="h-full w-full flex flex-col grow justify-center items-center" data-testid="loading-container">
                    <CircularProgress className="text-primary-soxo-red" data-testid="loading-spinner" />
                </div>
            )}
            {!loading && todosList?.length === 0 && <TodoNoTaskInfo />}
            {!loading && (
                <List className="w-full py-0" data-testid="todos-list">
                {todosList.map(({id, title, completed}) => (
                    <TodoListItem key={id} todo={{id, title, completed}} />
                ))}
            </List>
            )}
        </Paper>
    )
}

export default TodoList;
