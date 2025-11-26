"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className = "", appName }: ButtonProps) => {
  const baseClasses = "rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-dark-2 cursor-pointer transition-colors duration-250 hover:border-yellow-2 focus:outline focus:outline-4";
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <button
      className={combinedClasses}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
