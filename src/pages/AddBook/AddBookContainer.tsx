import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { AddBookContent } from "./AddBookContent"
import { AddBookStateContext } from "./state/AddBookStateStateContext"
import { api } from "../../common/api"
import { useNavigate } from 'react-router-dom'
import { allBooksRoutes } from '../routes'

export const AddBookContainer = observer(() => {
  const addBookState = useContext(AddBookStateContext)

  return (
    <AddBookContent
      onSubmit={submitBookAsync}
      onNavigate={submitNavigate}
    />
  )

  async function submitBookAsync() {
    if (!addBookState.validate()) return

    const payload = {
      title: addBookState.title,
      annotation: addBookState.annotation,
      authors: addBookState.authors
        .filter(Boolean)
        .map(fullName => ({
          fullName, 
        })),
      language: addBookState.language === `rus` 
        ? `ru` 
        : `en`,
      bookCoverUrl: addBookState.coverUrl,
    }

    await api.post(`/books`, payload)
  }

  async function submitNavigate () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    
    navigate(allBooksRoutes[0].path)
  }
})
