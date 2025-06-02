import TodoList from "@/components/todos/TodoList/TodoList";
import {TodoProvider} from "@/context/TodoContext";
import {FC} from "react";
import TodoListStatusFilter from "@/components/todos/TodoListStatusFilter/TodoListStatusFilter";
import TodoLoadMoreButton from "@/components/todos/TodoLoadMoreButton/TodoLoadMoreButton";
import {Todo} from "@/lib/types";

interface TodoContainerProps {
    initialTodos: Todo[]
}

const TodoContainer:FC<TodoContainerProps> = ({initialTodos}) => {
    return (
        <TodoProvider initialTodos={initialTodos}>
            <div className="w-full max-w-[780px] lg:px-0 px-6">
                <div className="w-full flex justify-between flex-wrap">
                    <h1 className="text-4xl font-bold lg:mb-0 lg:w-auto mb-6 text-center w-full">Todo List</h1>
                    <div className="w-full lg:max-w-[350px] mb-6">
                        <TodoListStatusFilter/>
                    </div>
                </div>
                <TodoList/>
                <TodoLoadMoreButton/>
            </div>
        </TodoProvider>
    )
}

export default TodoContainer
