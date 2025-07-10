import { useContext } from "react"
import { jwtDecode } from 'jwt-decode'
import { authService } from "./authService"

interface DecodedToken {
  permissions: string[],
}

export const hasAccessPermission = ({
  permission,
}: {
  permission: string,
}): boolean => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authContext = useContext<string[]>(authService.AuthContext)

  const token = authContext?.[0] || null

  if (!token) {
    return false
  }

  try {
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)

    return decodedToken.permissions.includes(permission)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error decoding token:`, error)
    return false
  }
}
