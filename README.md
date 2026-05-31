# SignupGenius Tech Assessment

## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **pnpm** — package manager
- **React Testing Library** + **Vitest** + **happy-dom** — testing
- **CSS Modules** + **CSS custom properties** — component-scoped styles with design tokens

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `pnpm dev`      | Start dev server at `http://localhost:5173` |
| `pnpm build`    | Type-check and build for production         |
| `pnpm test`     | Run tests in watch mode                     |
| `pnpm test:run` | Run tests once (CI)                         |
| `pnpm lint`     | Lint the codebase                           |

## Project Structure

```
src/
  App.tsx                        # Shell — TopNav + page routing
  App.module.css
  main.tsx                       # Entry point
  index.css                      # Global base styles
  vite-env.d.ts                  # Vite + *.mdx?raw type declarations

  assets/
    dataStructure.ts             # Static slot data

  theme/
    ThemeContext.tsx              # Light/dark theme context + toggle
    tokens.css                   # Design token definitions

  components/
    types.ts                     # Shared types (SlotData, GroupType)
    ParticipantBadge/            # Pill badge for a participant name
    Slot/                        # Single sign-up card with sign-up/cancel logic
    SlotAction/                  # Sign-up / cancel button (tested)
    SlotGroup/                   # Filtered, labeled group of slots
    TopNav/                      # Top navigation bar with page links and theme toggle

  pages/
    ComponentsPage/              # Component showcase with props tables and live examples
    DemoPage/                    # Full sign-up sheet demo (grouped by Shift / Category / Custom Label)
    DocumentationPage/           # Renders ADR.mdx — architecture decision records

  docs/
    ADR.mdx                      # All ADRs in one document

  test/
    setup.ts                     # jest-dom matchers setup
```

## App Pages

The app has three pages accessible from the top navigation:

- **Components** — interactive component showcase with prop documentation and live examples
- **Demo** — the full sign-up sheet, groupable by Shift, Category, or Custom Label
- **Documentation** — architecture decision records (ADRs) covering component API, state management, theming, data structure, testing, and production considerations

## Theming

Light and dark modes are powered by CSS custom properties. Toggling the theme sets `data-theme="dark"` on `document.documentElement`, which switches the token values. No component styles contain any light/dark conditionals.
