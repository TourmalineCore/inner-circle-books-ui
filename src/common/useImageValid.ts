import { useState, useEffect } from "react"

export function useImageValid(url: string) {
  const [
    isValid,
    setIsValid,
  ] = useState(false)

  useEffect(() => {
    if (!url) {
      setIsValid(false)
      return
    }

    const img = new Image()
    img.onload = () => setIsValid(true)
    img.onerror = () => setIsValid(false)
    img.src = url
  }, [
    url,
  ])

  return isValid
}
