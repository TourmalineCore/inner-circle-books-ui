import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useParams} from "react-router-dom"

export const BookContainer = observer(() => {
  const {
    id, 
  } = useParams()
  const bookState = useContext(BookStateContext)

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`id`, id)
    async function loadBookAsync() {
      const {
        data,
      } = await api.get<BookType>(`/books/${id}`)

      bookState.initialize({
        loadedBook: data,
      })
    }

    loadBookAsync()
  }, [
    id,
  ])

  return (
    <BookContent />
  )
})
