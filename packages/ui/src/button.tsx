"use client";

import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string;
    "aria-label"?: string;
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    loading = false,
    loadingText,
    fullWidth = false,
    onClick,
    className = "",
    "aria-label": ariaLabel,
}: ButtonProps) => {
    // Variantes de estilo
    const variantClasses = {
        primary: "btn-primary text-dark-1 font-semibold transition-all",
        secondary: "btn-secondary transition-colors",
        danger: "btn-danger text-white-1 font-medium border-0 transition-colors",
        ghost: "bg-transparent text-gray-1 hover:text-yellow-2 border-none",
    };

    // Tamaños
    const sizeClasses = {
        sm: "px-2 py-1 text-sm rounded-md",
        md: "px-4 py-2.5 text-base rounded-lg",
        lg: "px-6 py-3 text-base rounded-lg",
    };

    // Clases base
    const baseClasses = "cursor-pointer transition-all duration-300 focus:outline-none";

    // Clases de estado disabled
    const disabledClasses =
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

    // Clase fullWidth
    const widthClass = fullWidth ? "w-full" : "";

    // Combinar todas las clases
    const combinedClasses =
        `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`.trim();

    const isDisabled = disabled || loading;
    const displayText = loading ? loadingText || "Loading..." : children;

    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
        >
            {displayText}
        </button>
    );
};
