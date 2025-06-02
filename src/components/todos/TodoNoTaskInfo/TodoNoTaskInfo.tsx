import {FC} from "react";
import WarningIcon from '@mui/icons-material/Warning';
import {Typography} from "@mui/material";

const TodoNoTaskInfo:FC = () => {
    return (
        <div className="h-full w-full flex flex-col grow justify-center items-center" data-testid="no-task-info">
            <WarningIcon className="text-[55px] mb-3" />
            <Typography className="text-3xl">No tasks found</Typography>
        </div>
    );
};

export default TodoNoTaskInfo;
