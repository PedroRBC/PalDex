"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface TypeContextType {
  currentType: string
  setCurrentType: (type: string) => void
}

const TypeContext = createContext<TypeContextType | undefined>(undefined)

export function TypeProvider({ children }: { children: ReactNode }) {
  const [currentType, setCurrentType] = useState<string>("normal")

  return (
    <TypeContext.Provider value={{ currentType, setCurrentType }}>
      {children}
    </TypeContext.Provider>
  )
}

export function useType() {
  const context = useContext(TypeContext)
  if (context === undefined) {
    throw new Error("useType must be used within a TypeProvider")
  }
  return context
} 