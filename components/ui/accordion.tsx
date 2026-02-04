"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionContextType {
  openItems: Set<string>
  toggleItem: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextType | null>(null)

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within Accordion")
  }
  return context
}

export interface AccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  className?: string
}

export function Accordion({
  children,
  type = "single",
  defaultValue,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set()
    if (type === "single") {
      return new Set([defaultValue as string])
    }
    return new Set(defaultValue as string[])
  })

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev)
        if (type === "single") {
          next.clear()
          if (!prev.has(value)) {
            next.add(value)
          }
        } else {
          if (next.has(value)) {
            next.delete(value)
          } else {
            next.add(value)
          }
        }
        return next
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

const ItemContext = React.createContext<{ value: string; isOpen: boolean } | null>(null)

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { openItems } = useAccordionContext()
  const isOpen = openItems.has(value)
  
  return (
    <ItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("border-b", className)} data-value={value} data-state={isOpen ? "open" : "closed"}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { toggleItem } = useAccordionContext()
  const itemContext = React.useContext(ItemContext)
  if (!itemContext) throw new Error("AccordionTrigger must be used within AccordionItem")
  
  const { value, isOpen } = itemContext

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-200",
        isOpen && "rotate-180"
      )} />
    </button>
  )
}

export interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const itemContext = React.useContext(ItemContext)
  if (!itemContext) throw new Error("AccordionContent must be used within AccordionItem")
  
  const { isOpen } = itemContext

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300",
        isOpen 
          ? "max-h-[1000px] opacity-100" 
          : "max-h-0 opacity-0"
      )}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  )
}
