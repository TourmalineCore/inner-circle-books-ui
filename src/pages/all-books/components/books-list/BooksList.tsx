import './BooksList.scss'

import NoBook from '../../../../assets/icons/Not-found.svg?react'

import { observer } from "mobx-react-lite"
import { BookCard } from '../book-card/BookCard'

export const BooksList = observer(({
  cards,
}: {
  cards: BookCardType[],
}) => {
  return (
    <>
      {
        cards.length > 0 
          ? (
            <ul
              className="books-list"
              data-cy="books-list"
            >
              {
                cards.map(({
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
          ) 
          : (
            <h2 className="books-list__empty">
              <NoBook />
              No books yet         
            </h2>
          )
      }
    </>
  )
})
