"use client"

import { useAuth } from "@clerk/nextjs"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import type { ReactNode } from "react"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    console.warn("Convex is not configured. Running without Convex backend.")
    return <>{children}</>
  }
  
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
