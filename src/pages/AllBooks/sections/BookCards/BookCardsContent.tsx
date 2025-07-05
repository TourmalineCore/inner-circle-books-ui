import { observer } from "mobx-react-lite"
import { BooksList } from './components/BooksList/BooksList'
import { Actions } from './components/Actions/Actions'

export const BookCardsContent = observer(({
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
