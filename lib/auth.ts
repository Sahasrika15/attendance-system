import type { NextRequest } from "next/server"
import { verifyToken } from "./jwt"

export async function getAuthUser(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return null
    }

    const payload = verifyToken(token)
    return payload
  } catch (error) {
    return null
  }
}

export function requireAuth(allowedRoles: string[] = []) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request)

    if (!user) {
      return { error: "Unauthorized", status: 401 }
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { error: "Forbidden", status: 403 }
    }

    return { user }
  }
}
