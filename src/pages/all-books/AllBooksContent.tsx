import { observer } from "mobx-react-lite"
import { BooksList } from './components/books-list/BooksList'
import { Actions } from './components/actions/Actions'

export const AllBooksContent = observer(({
  cards,
  query,
  onQueryChange,
}: {
  cards: BookCardType[],
  query: string,
  onQueryChange: (value: string) => void,
}) => {
  return (
    <>
      <Actions 
        query={query}
        onQueryChange={onQueryChange} />
      <BooksList cards={cards} />
    </>
  )
})