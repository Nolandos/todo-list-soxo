"use client";

import Button from "@/components/ui/Button/Button";
import {useTodos} from "@/context/TodoContext";

const TodoLoadMoreButton = () => {
    const {loadMore, paginationSize, total} = useTodos();

    return (
        <div className="w-full flex justify-center mt-6">
            {paginationSize < total && (
                <Button
                onClick={() => loadMore()}
                variant="contained"
            >
                Load more
            </Button>
            )}
        </div>
    )
}

export default TodoLoadMoreButton
