import { useMemo } from "react"
import { ReturnBookContainer } from "./ReturnBookContainer"
import { ReturnBookState } from "./state/ReturnBookState"
import { ReturnBookStateContext } from "./state/ReturnBookStateContext"
import { bookCopyRoutes } from "../routes"

export function ReturnBookPage() {
  const returnBookState = useMemo(
    () => new ReturnBookState(),
    [],
  )

  const goToBookCopyPage = ({
    copyId,
  }: {
    copyId: string,
  }) => {
    window.location.href = bookCopyRoutes[0].path.replace(`:id`, copyId)
  }

  return (
    <ReturnBookStateContext.Provider value={returnBookState}>
      <ReturnBookContainer goToBookCopyPage={goToBookCopyPage}/>
    </ReturnBookStateContext.Provider>
  )
}