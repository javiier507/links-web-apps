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

export const Button = ({
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
    // Size class using CSS classes
    const sizeClass = `btn-${size}`;

    // Variant and color combination using CSS classes
    const variantColorClass = `btn-${variant}-${color}`;

    // Base classes (using Tailwind utilities for common styles)
    const baseClasses =
        "cursor-pointer font-semibold transition-colors duration-300 focus:outline-none";

    // Disabled classes
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";

    // Full width class
    const widthClass = fullWidth ? "w-full" : "";

    // Combine all classes
    const combinedClasses =
        `${baseClasses} ${sizeClass} ${variantColorClass} ${disabledClasses} ${widthClass} ${className}`.trim();

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
