import './BookCardsContent.scss'

import { observer } from "mobx-react-lite"
import { BooksList } from './components/BooksList/BooksList'
import { AllBooksActions } from '../AllBooksActions/AllBooksActions'

export const BookCardsContent = observer(({
  cards,
}: {
  cards: BookCardType[],
}) => {
  return (
    <>
      <AllBooksActions />
      <BooksList cards={cards}/>
    </>
  )
})
