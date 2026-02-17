"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession()

      console.log("Initial session:", data.session)

      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    initializeAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        console.log("Auth state changed:", session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log("Attempting login...")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("SignIn response:", data)

    if (error) {
      console.log("Login error:", error.message)
      return { error: error.message }
    }

    // 🔥 CRITICAL: Manually set user immediately
    if (data?.user) {
      console.log("Setting user manually:", data.user)
      setUser(data.user)
    }

    return {}
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })

    if (error) return { error: error.message }

    if (data?.user) {
      setUser(data.user)
    }

    return {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a SupabaseProvider")
  }
  return context
}