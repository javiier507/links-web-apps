# Project Rules

> For general project information, setup instructions, and tech stack details, see [README.md](./README.md)

## Monorepo Structure

**IMPORTANT:** This is a **monorepo** for the Wlinks project - an application for saving and organizing links. Understanding the structure is critical:

### Applications (`apps/`)

- **`apps/web`** - Web version built with Next.js
  - Purpose: Main web application accessible via browser
  - Framework: Next.js with Next Auth for authentication

- **`apps/extension`** - Browser extension for Chromium-based browsers
  - Purpose: Save links directly from the browser
  - Build tool: Vite

### Packages (`packages/`)

- **`packages/ui`** - Centralized UI package
  - **CRITICAL:** This is the single source of truth for styling and UI components
  - Contains: Tailwind CSS v4 theme configuration, color palette, and reusable React components
  - **All apps MUST align with this package** for styling consistency
  - Do NOT create duplicate styling logic in apps

- **`packages/api`** - Backend integration layer
  - Purpose: All communication with the backend (Appwrite)
  - Implementation: JavaScript SDK wrapper for Appwrite
  - **All backend calls MUST go through this package**
  - Do NOT make direct Appwrite calls from apps

## Styling Guidelines

- **Framework:** Tailwind CSS v4 (configured in `packages/ui`)
- **Theme location:** `packages/ui/src/styles.css` using `@theme` directive
- **Color palette:** Defined in `packages/ui/src/styles.css`
- **Configuration:** Centralized in `packages/ui/tailwind.config.ts`
- **Apps import:** Each app imports `@import '@repo/ui/styles'` in their main CSS file
- **DO NOT:**
  - Define custom colors in apps - use the centralized theme
  - Duplicate Tailwind configuration
  - Create app-specific theme configurations

## JavaScript Code Style

- **Linting/Formatting:** Code is automatically formatted with Biome on commit via lint-staged
- **TypeScript:**
  - Always maintain strict type safety
  - **Prefer `type` over `interface`** for type definitions
  - ✅ Good: `type User = { name: string; email: string; }`
  - ❌ Avoid: `interface User { name: string; email: string; }`
- **Constants:**
  - **All constants must be written in UPPER_CASE** with underscores separating words
  - ✅ Good: `const MAX_RETRIES = 3; const API_BASE_URL = 'https://api.example.com';`
  - ❌ Avoid: `const maxRetries = 3; const apiBaseUrl = 'https://api.example.com';`
- **Functions and Classes:**
  - **All function and class names must be written in PascalCase**
  - ✅ Good: `function CalculateTotal(items: Item[]) { ... }` | `class UserService { ... }`
  - ❌ Avoid: `function calculateTotal(items: Item[]) { ... }` | `class userService { ... }`
  - **Prefer named functions over arrow functions** for better debugging and stack traces
  - Exception: Arrow functions are acceptable for callbacks, array methods, and React components
- **Function parameters:**
  - **Avoid destructuring in function parameters** unless using default values
  - ✅ Good: `function ProcessUser(user: User) { const name = user.name; ... }`
  - ❌ Avoid: `function ProcessUser({ name, email }: User) { ... }`
  - Exception: Destructuring is acceptable when providing default values
  - ✅ Allowed: `function Configure({ port = 3000, host = 'localhost' }: Config) { ... }`
- **Exports:**
  - **Always use named exports instead of default exports**
  - ✅ Good: `export function CalculateTotal() { ... }` | `export const API_URL = '...';`
  - ❌ Avoid: `export default function CalculateTotal() { ... }` | `export default API_URL;`
- **Imports:**
  - **ALWAYS use path aliases** (`@/`) instead of relative imports for better maintainability
  - ✅ Good: `import { something } from "@/lib/utils"`
  - ❌ Bad: `import { something } from "../../lib/utils"`
  - Path alias `@/` is configured in `tsconfig.json` and maps to `./src/*`

## Dependencies

- **Adding dependencies:**
  - Workspace root: `pnpm add -w <package>`
  - Specific app: `pnpm add <package> --filter server`
- **Check before adding:** Verify if a similar package already exists in the monorepo
- **Version pinning (CRITICAL):**
  - **All dependencies MUST use exact versions** (no `^`, `~`, or other range operators)
  - This ensures reproducible builds and prevents unexpected breaking changes
  - ✅ Good: `"next": "15.5.0"`
  - ❌ Bad: `"next": "^15.5.0"`
  - When adding new dependencies, manually remove version range operators from `package.json`