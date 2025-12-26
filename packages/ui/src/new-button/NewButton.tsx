"use client";

import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "solid" | "ghost";
    color?: "dark" | "yellow" | "red";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string;
    "aria-label"?: string;
}

export const NewButton = ({
    children,
    size = "md",
    variant = "solid",
    color = "yellow",
    type = "button",
    disabled = false,
    loading = false,
    loadingText,
    fullWidth = false,
    onClick,
    className = "",
    "aria-label": ariaLabel,
}: Props) => {
    // Size classes - following Chakra UI sizing
    const sizeClasses = {
        xs: "h-6 min-w-6 text-xs px-2 rounded-sm",
        sm: "h-8 min-w-8 text-sm px-3 rounded-md",
        md: "h-10 min-w-10 text-md px-4 rounded-md",
        lg: "h-12 min-w-12 text-lg px-6 rounded-md",
        xl: "h-14 min-w-14 text-xl px-8 rounded-lg",
    };

    // Variant and color combinations
    const getVariantColorClasses = () => {
        if (variant === "solid") {
            const solidColors = {
                dark: "bg-dark-2 text-white-1 hover:bg-dark-3",
                yellow: "bg-yellow-2 text-dark-1 hover:bg-yellow-1",
                red: "bg-red-1 text-white-1 hover:bg-red-2",
            };
            return solidColors[color];
        }

        // ghost variant
        const ghostColors = {
            dark: "bg-transparent text-gray-1 hover:text-white-1",
            yellow: "bg-transparent text-yellow-2 hover:text-yellow-1",
            red: "bg-transparent text-red-1 hover:text-red-2",
        };
        return ghostColors[color];
    };

    // Base classes
    const baseClasses =
        "cursor-pointer font-semibold transition-colors duration-300 focus:outline-none";

    // Disabled classes
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";

    // Full width class
    const widthClass = fullWidth ? "w-full" : "";

    // Combine all classes
    const combinedClasses =
        `${baseClasses} ${sizeClasses[size]} ${getVariantColorClasses()} ${disabledClasses} ${widthClass} ${className}`.trim();

    const isDisabled = disabled || loading;
    const displayText = loading ? loadingText || "Loading..." : children;

    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={isDisabled}
            aria-label={ariaLabel}
            aria-busy={loading}
        >
            {displayText}
        </button>
    );
};
