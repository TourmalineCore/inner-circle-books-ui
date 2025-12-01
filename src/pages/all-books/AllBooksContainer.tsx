import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { api } from "../../common/api"
import { AllBooksContent } from "./AllBooksContent"

export const AllBooksContainer = observer(() => {
  const allBooksState = useContext(AllBooksStateContext)

  useEffect(() => {
    async function loadBookCardsAsync() {
      const {
        data: {
          books,
        },
      } = await api.get<{ 
        books: BookCardType[], 
      }>(``)

      allBooksState.initialize({
        booksCards: books,
      })
    }

    loadBookCardsAsync()
  }, [])

  return (
    <AllBooksContent cards={allBooksState.booksCards} />
  )
})