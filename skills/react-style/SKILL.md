---
name: react-style
description: Enforce consistent React 18 component code style in this project. Use when editing or generating React components, hooks, JSX event handlers, or local component utilities, especially when Codex should follow project-specific conventions such as defining component-scoped functions with arrow syntax instead of the function keyword and avoiding unnecessary memoization helpers.
---

# React Style

Follow these rules when working on React code in this project:

- Treat this project as a React 18 codebase.
- Use arrow functions for all component-scoped functions.
- Do not use the `function` keyword for React function components.
- Do not use the `function` keyword for helper functions, event handlers, callbacks, or local utilities defined inside React components.
- Prefer `const Name = () => {}` for components and `const handleClick = () => {}` for component-local handlers.
- Do not add `useMemo`, `useCallback`, or `memo` by default.
- Only use `useMemo`, `useCallback`, or `memo` when the user explicitly asks for them or there is a clear, demonstrated performance reason.
- Preserve existing external APIs unless the user asks for a refactor.
- Match the surrounding file's naming, import ordering, and JSX formatting unless it conflicts with these rules.

Examples:

```jsx
const TodoItem = ({ task, onToggle }) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  return <button onClick={handleToggle}>{task.title}</button>;
};
```

Avoid:

```jsx
function TodoItem({ task, onToggle }) {
  function handleToggle() {
    onToggle(task.id);
  }

  return <button onClick={handleToggle}>{task.title}</button>;
}
```
