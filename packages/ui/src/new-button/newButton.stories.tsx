import * as React from "react";
import { NewButton } from ".//NewButton";

// Sizes
export const Sizes = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Sizes</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <NewButton size="xs">NewButton</NewButton>
            <NewButton size="sm">NewButton</NewButton>
            <NewButton size="md">NewButton</NewButton>
            <NewButton size="lg">NewButton</NewButton>
            <NewButton size="xl">NewButton</NewButton>
        </div>
    </div>
);

// Variants
export const Variants = () => (
    <div className="flex flex-col gap-6 p-8 bg-dark-3">
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white-1">Variants - Solid</h2>
            <div className="flex items-center gap-4 flex-wrap">
                <NewButton color="yellow" variant="solid">
                    Yellow
                </NewButton>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white-1">Variants - Ghost</h2>
            <div className="flex items-center gap-4 flex-wrap">
                <NewButton color="yellow" variant="ghost">
                    Yellow
                </NewButton>
                <NewButton color="dark" variant="ghost">
                    Dark
                </NewButton>
                <NewButton color="red" variant="ghost">
                    Red
                </NewButton>
            </div>
        </div>
    </div>
);

// Colors
export const Colors = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Colors</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <NewButton color="yellow">Yellow</NewButton>
            <NewButton color="dark">Dark</NewButton>
            <NewButton color="red">Red</NewButton>
        </div>
    </div>
);

// Disabled
export const Disabled = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Disabled</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <NewButton disabled>Yellow</NewButton>
            <NewButton color="dark" disabled>
                Dark
            </NewButton>
            <NewButton color="red" disabled>
                Red
            </NewButton>
        </div>
    </div>
);

// Loading
export const Loading = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Loading</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <NewButton loading>Loading</NewButton>
            <NewButton color="dark" loading loadingText="Processing...">
                Process
            </NewButton>
        </div>
    </div>
);
