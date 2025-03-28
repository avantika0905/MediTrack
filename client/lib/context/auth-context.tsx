"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  username: string
  roles: string[]
}

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
}

interface AuthContextType {
  auth: AuthState
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
  })

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth")
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth)
        setAuth(parsedAuth)
      } catch (error) {
        console.error("Failed to parse auth from localStorage:", error)
        localStorage.removeItem("auth")
      }
    }
  }, [])

  const login = (token: string, user: User) => {
    const newAuth = {
      isAuthenticated: true,
      token,
      user,
    }
    setAuth(newAuth)
    localStorage.setItem("auth", JSON.stringify(newAuth))
  }

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    })
    localStorage.removeItem("auth")
  }

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

