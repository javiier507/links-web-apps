import * as React from "react";
import { Button } from "./Button";

// Sizes
export const Sizes = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Sizes</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <Button size="xs">Button</Button>
            <Button size="sm">Button</Button>
            <Button size="md">Button</Button>
            <Button size="lg">Button</Button>
            <Button size="xl">Button</Button>
        </div>
    </div>
);

// Variants
export const Variants = () => (
    <div className="flex flex-col gap-6 p-8 bg-dark-3">
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white-1">Variants - Solid</h2>
            <div className="flex items-center gap-4 flex-wrap">
                <Button color="yellow" variant="solid">
                    Yellow
                </Button>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white-1">Variants - Ghost</h2>
            <div className="flex items-center gap-4 flex-wrap">
                <Button color="yellow" variant="ghost">
                    Yellow
                </Button>
                <Button color="dark" variant="ghost">
                    Dark
                </Button>
                <Button color="red" variant="ghost">
                    Red
                </Button>
            </div>
        </div>
    </div>
);

// Colors
export const Colors = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Colors</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <Button color="yellow">Yellow</Button>
            <Button color="dark">Dark</Button>
            <Button color="red">Red</Button>
        </div>
    </div>
);

// Disabled
export const Disabled = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Disabled</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <Button disabled>Yellow</Button>
            <Button color="dark" disabled>
                Dark
            </Button>
            <Button color="red" disabled>
                Red
            </Button>
        </div>
    </div>
);

// Loading
export const Loading = () => (
    <div className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-bold mb-4">Loading</h2>
        <div className="flex items-center gap-4 flex-wrap">
            <Button loading>Loading</Button>
            <Button color="dark" loading loadingText="Processing...">
                Process
            </Button>
        </div>
    </div>
);
