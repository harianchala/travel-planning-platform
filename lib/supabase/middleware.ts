import { type NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  // For now, we'll handle session updates in the client-side provider
  // The middleware will just pass through and let the client handle auth state
  const response = NextResponse.next({
    request,
  })

  return response
}
