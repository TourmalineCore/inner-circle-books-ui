import { useMemo } from "react"
import { ReturnBookContainer } from "./ReturnBookContainer"
import { ReturnBookState } from "./state/ReturnBookState"
import { ReturnBookStateContext } from "./state/ReturnBookStateStateContext"
import { bookRoutes } from "../routes"

export function ReturnBookPage() {
  const returnBookState = useMemo(
    () => new ReturnBookState(),
    [],
  )

  const goToBookPage = () => {
    window.location.href = bookRoutes[0].path
  }

  return (
    <ReturnBookStateContext.Provider value={returnBookState}>
      <ReturnBookContainer goToBookPage={goToBookPage}/>
    </ReturnBookStateContext.Provider>
  )
}