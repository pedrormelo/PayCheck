// src/components/ui/button.jsx
export function Button({ children, className, ...props }) {
    return (
      <button className={`py-2 px-4 rounded-md ${className}`} {...props}>
        {children}
      </button>
    );
  }
  