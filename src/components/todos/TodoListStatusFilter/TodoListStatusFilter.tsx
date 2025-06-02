"use client";

import Select from "@/components/ui/Select/Select";
import {TodoStatusFilters} from "@/lib/enums";
import {useTodos} from "@/context/TodoContext";

interface option {
    id: number;
    value: string;
    label: string;
}

export const TodoListStatusFilter = () => {
    const {currentFilter, setFilter} = useTodos();
    const options: option[] = [
        {
            id: 1,
            value: TodoStatusFilters.ALL,
            label: 'All'
        },
        {
            id: 2,
            value: TodoStatusFilters.INCOMPLETE,
            label: 'Incomplete'
        },
        {
            id: 3,
            value: TodoStatusFilters.COMPLETED,
            label: 'Completed'
        },
    ];

    const handleSetFilterSelect = (value: string | null) => {
        if(value) setFilter(value as TodoStatusFilters);
    }

    return (
        <Select
            fullWidth
            id="tasks-status-filter"
            label="Select task status"
            onChangeHandler={handleSetFilterSelect}
            value={currentFilter}
            options={options}
        />
    )
}

export default TodoListStatusFilter;
