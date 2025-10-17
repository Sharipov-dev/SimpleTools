import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DialogContext)

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(true)
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
})
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const { open } = React.useContext(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  )
}

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/80 backdrop-blur-md",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DialogContext)

  return (
    <DialogPortal>
      <DialogOverlay onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={ref}
          className={cn(
            "relative z-50 w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl",
            className
          )}
          {...props}
        >
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 text-zinc-400 transition-opacity hover:opacity-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </DialogPortal>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-zinc-500", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}

