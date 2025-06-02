"use client";

import {FC} from "react";
import {Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useTodos} from "@/context/TodoContext";

interface TodoListItemProps {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    }
}

const TodoListItem:FC<TodoListItemProps> = ({todo: {id, title, completed}}) => {
    const labelId = `todo-list-label-${id}`;
    const {toggleTodoCompletion} = useTodos();

    return (
        <ListItem className="border-b border-gray-300" data-testid={`todo-item-${id}`}>
            <ListItemButton
                onClick={() => toggleTodoCompletion(id)}
                role={undefined}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={completed}
                        tabIndex={-1}
                        disableRipple
                        className="mui-checkbox"
                        inputProps={{ 'aria-labelledby': labelId }}
                        data-testid={`todo-checkbox-${id}`}
                    />
                </ListItemIcon>
                <ListItemText className={completed ? 'line-through' : 'no-underline'} id={labelId} primary={title} />
            </ListItemButton>
        </ListItem>
    )
}

export default TodoListItem;
