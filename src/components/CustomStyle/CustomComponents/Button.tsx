import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={`
          inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
          ${
            variant === "default" ? "bg-marrow-dark text-primary-foreground hover:bg-marrow" :
            variant === "secondary" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" :
            variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" :
            variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" :
            variant === "link" ? "text-primary underline-offset-4 hover:underline" :
            ""
          }
          ${
            size === "default" ? "h-9 px-4 py-2" :
            size === "sm" ? "h-8 rounded-md px-3 text-xs" :
            size === "lg" ? "h-10 rounded-md px-8" :
            ""
          }
          ${className}
        `}
        ref={ref}
        {...props}
      >{children}</button>
    )
  }
)
Button.displayName = "Button"

export { Button }