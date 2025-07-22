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
                  title,
                  language,
                  authors,
                  bookCoverUrl,
                }) => (
                  <li key={id}>
                    <a 
                      href={`/books/${id}`}
                      className="books-list__link"
                    >
                      <BookCard
                        title={title}
                        language={language}
                        authors={authors}
                        bookCoverUrl={bookCoverUrl}
                      />
                    </a>
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
