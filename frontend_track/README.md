# TaxStreem Transactions Frontend

A modern, accessible transaction management dashboard built with **Next.js**, **React**, and **Tailwind CSS**. Features real-time search, filtering, pagination, and detailed transaction views with a carefully designed user experience.

## How to Run

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Setup & Installation

1. **Clone and navigate to the frontend track:**

    ```bash
    cd frontend_track
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

### Type Checking

```bash
npx tsc --noEmit
```

---

## Approach

### State Management & Data Flow

**Centralized async state with discriminated unions** — The core state uses a discriminated union pattern (`AsyncState<T>`) to represent loading, success, and error states explicitly without boolean flags. This eliminates impossible state combinations.

**Custom hooks for separation of concerns:**

- `useTransactions()` — Fetches and manages transaction data; returns explicit status
- `useDebounce()` — Debounces search input (300ms) for performance
- `filterTransactions()` — Pure utility function for search, account filter, and sorting

**Component hierarchy:**

- **Page.tsx** — Orchestrates all state and renders appropriate views (loading → error → empty → list → detail)
- **SearchBar** — Controlled input with icons and clear button
- **AccountFilter** — Dynamic dropdown from unique account IDs
- **TransactionCard** — Clickable card with truncated preview
- **TransactionDetail** — Full transaction display with back navigation
- **State components** — LoadingSkeleton, ErrorState, EmptyState for consistent UX
- **Pagination** — Page navigation with disabled states

**Data Flow:**

1. Data fetches on mount via `useTransactions()` hook
2. Raw API data maps to domain model (`TransactionRecord`)
3. Three-layer filtering: search (via debounce) → account ID → sort order
4. Paginated results render as cards; clicking navigates to detail view

### Styling Strategy

All styling uses **Tailwind utilities with CSS custom variables** for theming:

- Light/dark themes defined in `globals.css`
- Components receive `var(--*)` tokens via Tailwind (e.g., `bg-[var(--bg-surface)]`)
- Maintains design system consistency without component-level CSS files

---

## Assumptions

1. **API Data Shape** — Assumed jsonplaceholder's `/posts` endpoint maps to transactions (userId → accountId, title → reference, body → description)

2. **Unique Account IDs** — Assumed account IDs are immutable, extracted client-side from transaction data

3. **Search Scope** — Assumed search queries match transaction reference (title) and description (body), not ID

4. **Sorting Behavior** — Assumed "sort order" means sorting by transaction ID numerically (ascending/descending)

5. **Pagination Reset** — Assumed filters should reset to page 1 for better UX (user expects fresh results)

6. **Debounce Duration** — Chose 300ms as reasonable balance between responsiveness and API calls

7. **No Persistence** — Assumed no need for client-side state persistence (localStorage); page refresh loses UI state

8. **Transaction Selection State** — Stored in component state, not URL routing (simpler for this scope)

---

## Trade-offs

| Decision                               | Why                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------- |
| **Client-side filtering**              | Simpler than backend for this scope; assumes manageable dataset (~100 records)      |
| **No routing for detail view**         | Keeps implementation simpler; detail view is modal-like state, not a separate route |
| **Debounce over request cancellation** | Simpler; debounce is sufficient for perceived responsiveness                        |
| **Truncated descriptions in cards**    | Improves scannability; full text shown in detail view                               |
| **No sorting UI toggle**               | Requirements didn't specify; filtering by account is sufficient for demo            |
| **No infinite scroll**                 | Pagination more predictable; number of records manageable                           |
| **Inline SVG icons**                   | Avoids icon library dependency; trade-off is verbosity vs. flexibility              |
| **CSS variables in Tailwind**          | Maximizes theme reusability; some custom values needed (colors, sizing)             |

---

## What You'd Improve (With More Time)

1. **Routing & Deep Linking**
    - Move detail view to a route (e.g., `/transactions/[id]`)
    - Enable bookmarking and browser back button for detail view
    - Preserve filter state in URL query params

2. **Backend Filtering**
    - Move search/filter to API with query params (`?search=...&accountId=...&sort=...`)
    - Reduces client-side computation; scales better with large datasets
    - Add server-side pagination

3. **Error Handling & Retry Logic**
    - Retry failed requests with exponential backoff
    - Show user-friendly error messages with actionable steps
    - Handle network timeouts gracefully

4. **Performance Optimizations**
    - Virtual scrolling for large transaction lists
    - Memoize filtered/paginated results more aggressively
    - Lazy load detail view content
    - Add analytics for performance monitoring

5. **Testing**
    - Unit tests for `filterTransactions()` utility
    - Integration tests for component interactions (search, filter, pagination)
    - E2E tests with Playwright
    - Mock API responses in tests

6. **Accessibility Enhancements**
    - Keyboard navigation for pagination
    - Screen reader labels for icon buttons
    - High contrast mode support
    - Reduced-motion media queries

7. **UI/UX Refinements**
    - Sort button/dropdown for interactive sorting
    - Multi-select account filter (vs. single select)
    - Export transactions to CSV
    - Favorite/bookmark transactions
    - Advanced filter panel (date range, amount, etc.)

8. **Code Organization**
    - Extract magic numbers (ITEMS_PER_PAGE, debounce duration) to config
    - Add comprehensive error boundaries
    - Refactor page.tsx into smaller, testable subcomponents

9. **Dark Mode**
    - Currently styled for support, but toggle button not fully integrated
    - Add `prefers-color-scheme` media query detection

10. **Documentation**
    - JSDoc comments on utility functions
    - Storybook for component documentation
    - API integration documentation

---

## Architecture Overview

```
src/
├── app/
│   ├── page.tsx           # Main orchestrator, state management
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Design tokens & theme
├── components/
│   ├── SearchBar.tsx      # Search input with icon & clear
│   ├── AccountFilter.tsx  # Account dropdown
│   ├── TransactionCard.tsx   # Clickable transaction preview
│   ├── TransactionDetail.tsx # Full transaction view
│   ├── Pagination.tsx     # Page navigation
│   ├── SortToggle.tsx     # Sort order toggle
│   ├── DarkModeToggle.tsx # Theme toggle
│   └── states/
│       ├── LoadingSkeleton.tsx
│       ├── ErrorState.tsx
│       └── EmptyState.tsx
├── hooks/
│   ├── useTransactions.ts # Fetch & manage transaction data
│   └── useDebounce.ts     # Debounce input
├── types/
│   └── index.ts           # Shared TypeScript interfaces
└── utils/
    └── filter.ts          # Filtering & sorting logic
```

---

## Tech Stack

- **Framework:** Next.js 16.2 (React 19)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Language:** TypeScript 5
- **State:** React hooks with discriminated unions
- **API:** JSONPlaceholder (mock data)

---

## Key Features

✅ **Real-time search** with debouncing (300ms)  
✅ **Filter by account ID** with dynamically generated options  
✅ **Pagination** with numbered buttons and prev/next navigation  
✅ **Transaction detail view** with full descriptions  
✅ **Accessibility** — aria-labels, keyboard focus, semantic HTML  
✅ **Responsive design** — mobile-friendly layout  
✅ **Dark mode support** — CSS custom variables for theming  
✅ **Loading & error states** — User-friendly feedback

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
