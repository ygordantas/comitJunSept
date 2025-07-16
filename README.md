
# 📦 React Components & Core Concepts Summary

## 🧱 Components Basics

### ✅ Reusability
Components are small, reusable building blocks of UI. You can reuse them across your app with different props.

### ✅ Related Code Lives Together
React encourages grouping HTML, JS (and optionally CSS) logic together in components.

### ✅ Separation of Concerns
Each component handles a specific piece of functionality or UI logic.

---

## 🧩 JSX (JavaScript eXtension)

- **Declarative Syntax**: Write what the UI should look like, not how to build it.
- **Not Browser Native**: JSX needs a build step to be converted into JavaScript (`React.createElement`).
- **Example**:

```tsx
const Hello = () => <h1>Hello World!</h1>;
```

---

## 🧠 Component Types

### ✅ Built-In Components
- Start with lowercase (`<div>`, `<button>`)
- Render as standard DOM elements

### ✅ Custom Components
- Use PascalCase (`<MyComponent />`)
- Defined by you, typically wrapping built-in components
- React traverses the component tree until only built-in DOM nodes remain

---

## 🎯 Dynamic Values in JSX

- Use `{}` to insert JS **expressions** inside JSX
- Example:

```tsx
const name = "John";
return <h2>Hello, {name}</h2>;
```

- **Images**: Import paths to avoid being lost during build:

```tsx
import logo from './logo.png';
<img src={logo} />
```

---

## 🎨 CSS in React

- Not scoped by default
- Use **CSS Modules** (`.module.css`) for file-level scope

---

## 🧒 `children` Prop

- Used to pass nested JSX into a component
- Example:

```tsx
const Card = ({ children }) => <div className="card">{children}</div>;

<Card><p>This is inside the card</p></Card>
```

---

## 🔁 React Re-Rendering

- Components re-execute only if their state or props change
- React compares old vs new JSX (virtual DOM diffing) and updates only what's changed

---

## 🎣 Rules of Hooks

- Only call hooks **inside component functions**
- Only call them at the **top level** (not inside conditions or loops)

---

## 🔢 Lists in React

- Use `.map()` to render lists
- Provide a **unique `key`** for each item

```tsx
items.map(item => <li key={item.id}>{item.name}</li>)
```

---

## 🧱 JSX is Optional

You can also use:

```tsx
React.createElement('h1', null, 'Hello');
```

…but JSX is more convenient.

---

## 🧩 React Fragments

Return multiple elements without a wrapper div:

```tsx
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

---

## 🚫 Props Are Not Automatically Forwarded

If your component should forward props, you need to do it manually:

```tsx
const MyButton = ({ title, children, ...rest }) => (
  <button {...rest}>{title}</button>
);
```

---

## 🧠 `state` vs `ref`

| Feature | `useState` | `useRef` |
|--------|------------|----------|
| Triggers re-render? | ✅ Yes | ❌ No |
| UI updates | ✅ | ❌ |
| Stores DOM element reference | ❌ | ✅ |
| Great for timers, reading input values | ❌ | ✅ |

### `useRef` Examples

1. **Custom file input trigger**:

```tsx
inputRef.current?.click();
```

2. **Timers**:

```tsx
const timerId = useRef<NodeJS.Timeout>();
timerId.current = setTimeout(...);
clearTimeout(timerId.current);
```

---

## 🔄 Forward Refs to Children

Use `forwardRef` to expose DOM nodes or methods to parents.

```tsx
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
```

---

## 💡 `useImperativeHandle`

Expose custom methods to parent via forwarded refs.

---

## 🔀 Passing Multiple Children (Named Slots)

```tsx
<Parent buttons={
  <div>
    <button>My Button</button>
    <button>Another</button>
  </div>
}>
  <p>Children here...</p>
</Parent>
```

```tsx
const Parent = ({ children, buttons }) => (
  <div>
    <menu>{buttons}</menu>
    {children}
  </div>
);
```

---

## 🧩 Dynamic Component Types

```tsx
<Parent container="section" />
```

```tsx
const Parent = ({ container }) => {
  const Container = container;
  return <Container>...</Container>;
};
```

---

## 🧰 Default Props in Functional Components

```tsx
const Box = ({ container = "div" }) => {
  const Container = container;
  return <Container>Default Container</Container>;
};
```

---

