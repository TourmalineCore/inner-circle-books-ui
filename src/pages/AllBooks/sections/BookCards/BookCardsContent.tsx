import './BookCardsContent.scss'

import { observer } from "mobx-react-lite"
import { BookCard } from './components/BookCard/BookCard'
import NoBook from '../../../../assets/icons/Not-found.svg?react'

export const BookCardsContent = observer(({
  cards,
}: {
  cards: BookCardType[],
}) => {
  return (
    <>
      {
        cards.length > 0 ? (
          <ul
            className="cards"
            data-cy="cards"
          >
            {cards.map(({
              bookCoverUrl,
              title,
              authors,
              language,
            }, index) => (
              <li key={index}>
                <BookCard
                  bookCoverUrl={bookCoverUrl}
                  title={title}
                  authors={authors}
                  language={language}
                />
              </li>
            ))}
          </ul>
        ) : (
          <h2 className="cards__empty">
            <NoBook />
            No books yet         
          </h2>
        )
      }
    </>
  )
})
