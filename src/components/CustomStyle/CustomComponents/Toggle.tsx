import React from "react"

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pressed?: boolean
    onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
    ({ className, children, pressed, onPressedChange, ...props }, ref) => {
        return (
            <button
                type="button"
                ref={ref}
                role="switch"
                aria-checked={pressed}
                data-state={pressed ? "on" : "off"}
                onClick={(e) => {
                    e.preventDefault();
                    onPressedChange?.(!pressed)
                }}
                className={`
            "inline-flex px-2 py-1 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-300 data-[state=on]:text-accent-foreground",
            ${className}
          `}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Toggle.displayName = "Toggle"

export { Toggle }