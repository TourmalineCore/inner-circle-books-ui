import { observer } from "mobx-react-lite"
import { BooksList } from './components/books-list/BooksList'
import { Actions } from './components/actions/Actions'

export const AllBooksContent = observer(({
  cards,
}: {
  cards: BookCardType[],
}) => {
  return (
    <>
      <Actions />
      <BooksList cards={cards}/>
    </>
  )
})
