# Project Rules

## Code Style

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