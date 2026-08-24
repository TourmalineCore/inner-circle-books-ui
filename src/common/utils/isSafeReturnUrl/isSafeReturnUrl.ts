export function isSafeReturnUrl({
  returnUrl,
  baseUrl = window.location.origin,
}: {
  returnUrl: string,
  // baseUrl is only needed for testing, there is no need to redefine it anywhere else
  baseUrl?: string,
}) {
  try {
    const url = new URL(returnUrl, baseUrl)

    if (url.origin !== baseUrl) {
      return false
    }

    if (url.searchParams.has(`returnUrl`)) {
      return false
    }

    return true
  }
  catch {
    return false
  }
}