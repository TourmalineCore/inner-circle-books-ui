import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useLocation, useSearchParams} from "react-router-dom"

export const BookContainer = observer(({
  openModalQrCode,
}: {
  openModalQrCode: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)
  const location = useLocation()
      
  const pathnameParts = location
    .pathname
    .split(`/`)

  const id = pathnameParts[2]

  const isBookCopy = location.pathname.includes(`/copy`)
  const copyId = pathnameParts?.[3]

  const [
    searchParams,
  ] = useSearchParams()
  
  const secretKey = searchParams.get(`s`)

  useEffect(() => {
    loadBookAsync()
  }, [
    id,
    copyId,
  ])

  return (
    <BookContent
      bookId={id} 
      onTake={takeBookAsync}
      copyId={copyId}
      openModalQrCode={openModalQrCode}
    />
  )

  async function loadBookAsync() {
    const url = isBookCopy
      ? `/books/copy/${copyId}?secretKey=${secretKey}`
      : `/books/${id}`

    const {
      data,
    } = await api.get<BookType>(url)

    bookState.initialize({
      loadedBook: data,
    })
  }

  async function takeBookAsync({
    bookCopyId,
    scheduledReturnDate,
  }: TakeBookType) {
    bookState.setIsTriedToSubmit()

    try {
      await api.post<TakeBookType>(
        `/books/take`,
        {
          bookCopyId,
          scheduledReturnDate,
        },
      )
      
      await loadBookAsync() 
    }
    finally {
      bookState.resetIsTriedToSubmit()
    }
  }
})
