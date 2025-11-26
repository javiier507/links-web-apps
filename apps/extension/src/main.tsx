import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { helloWorld } from "@repo/api/index";
import App from "./App.tsx";

helloWorld();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
