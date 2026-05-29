# SignupGenius Tech Assessment

## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **pnpm** — package manager
- **React Testing Library** + **Vitest** — testing
- **CSS Modules** — component-scoped styles

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `http://localhost:5173` |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once (CI) |
| `pnpm lint` | Lint the codebase |

## Project Structure

```
src/
  App.tsx              # Root component
  App.module.css       # CSS Module for App
  App.test.tsx         # Tests for App
  main.tsx             # Entry point
  index.css            # Global base styles
  test/
    setup.ts           # jest-dom matchers setup
```

## CSS Modules

Components use CSS Modules for scoped styles. Import the module and reference class names via the `styles` object:

```tsx
import styles from './MyComponent.module.css'

function MyComponent() {
  return <div className={styles.container}>...</div>
}
```
