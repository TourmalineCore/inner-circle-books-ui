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
                  id,
                  bookCoverUrl,
                  title,
                  authors,
                  language,
                }) => (
                  <li key={id}>
                    <button onClick={() => window.location.href = `/books/${id}`}
                      className="books-list__link">
                      <BookCard
                        bookCoverUrl={bookCoverUrl}
                        title={title}
                        authors={authors}
                        language={language}
                      />
                    </button>
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
