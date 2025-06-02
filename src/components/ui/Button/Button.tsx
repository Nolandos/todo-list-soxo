"use client";

import {FC, ReactNode} from "react";
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from "clsx";

interface ButtonProps {
    children: ReactNode;
    variant?: 'contained' | 'outlined';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
}

const Button:FC<ButtonProps> = ({
    children, 
    variant = 'contained', 
    onClick, 
    className, 
    type = 'button',
    disabled = false,
    fullWidth = false,
    loading = false
}) => {
    const baseClasses = "px-6 py-2.5 rounded font-medium transition-all duration-200 rounded-none";

    const variantClasses = {
        contained: "bg-primary-soxo-red text-white hover:bg-opacity-90 shadow-sm",
        outlined: "border-2 border-primary-soxo-red text-primary-soxo-red hover:bg-primary-soxo-red hover:bg-opacity-10 hover:text-white"
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';
    return (
        <MuiButton
            variant={variant}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            fullWidth={fullWidth}
            className={clsx(
                baseClasses,
                variantClasses[variant],
                widthClass,
                disabledClass,
                className
            )}
        >
            <div className="flex items-center justify-center gap-2">
                {children}
                {loading && (
                    <CircularProgress 
                        size={16} 
                        color="inherit" 
                    />
                )}
            </div>
        </MuiButton>
    )
}

export default Button;
