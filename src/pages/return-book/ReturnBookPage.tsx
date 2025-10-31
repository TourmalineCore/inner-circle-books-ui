import { useMemo } from "react"
import { ReturnBookContainer } from "./ReturnBookContainer"
import { ReturnBookState } from "./state/ReturnBookState"
import { ReturnBookStateContext } from "./state/ReturnBookStateContext"

export function ReturnBookPage() {
  const returnBookState = useMemo(
    () => new ReturnBookState(),
    [],
  )

  return (
    <ReturnBookStateContext.Provider value={returnBookState}>
      <ReturnBookContainer />
    </ReturnBookStateContext.Provider>
  )
}