import './BooksList.scss'

import NoBook from '../../../../assets/icons/Not-found.svg?react'

import { observer } from "mobx-react-lite"
import { BookCard } from '../book-card/BookCard'
import { LINK_TO_BOOKS_SERVICE } from '../../../../common/constant'
import { BooksLoader } from '../../../../components/books-loader/BooksLoader'

export const BooksList = observer(({
  cards,
  isLoading,
}: {
  cards: BookCardType[],
  isLoading: boolean,
}) => {
  return (
    <div className='books-list'>
      {renderContent()}
    </div>
  )

  function renderContent() {
    if (isLoading) {
      return (
        <BooksLoader />
      )
    }

    return (
      cards.length > 0 
        ? (
          <ul
            className="books-list__list"
            data-cy="books-list"
          >
            {
              cards.map(({
                id,
                title,
                language,
                authors,
                coverUrl,
                knowledgeAreas,
              }) => (
                <li key={id}>
                  <a 
                    href={`${LINK_TO_BOOKS_SERVICE}/${id}`}
                    className="books-list__link"
                  >
                    <BookCard
                      title={title}
                      language={language}
                      authors={authors}
                      coverUrl={coverUrl}
                      knowledgeAreas={knowledgeAreas}
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
    )
  }
})
