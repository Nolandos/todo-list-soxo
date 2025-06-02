import {FormControl, InputLabel, MenuItem, Select as MuiSelect} from "@mui/material";
import {FC} from "react";

interface SelectProps {
    id: string;
    label: string;
    onChangeHandler: (value: string | null) => void;
    value: string;
    options: {id: number, label: string; value: string}[];
    fullWidth?: boolean;
}

export const Select:FC<SelectProps> = ({id, label, onChangeHandler, value, options, fullWidth }) => {
    return (
        <FormControl
            fullWidth={fullWidth}>
            <InputLabel className="mui-select-label" id={`${id}-label`}>{label}</InputLabel>
            <MuiSelect
                className="rounded-none mui-select"
                labelId={`${id}-label`}
                id={id}
                value={value}
                label={label}
                onChange={(event) => onChangeHandler(event?.target?.value || null)}
            >
                {options.map (({id, label, value}) => (
                    <MenuItem key={id} value={value}>{label}</MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    )
}

export default Select;
