import './BooksCard.scss'

import { observer } from "mobx-react-lite"

export const BookCard = observer(({
  bookCoverUrl,
  title,
  authors,
  language,
}: BookCardType) => {
  const firstAuthor = authors[0]?.fullName
  const suffix = authors.length > 1 
    ? (
      language === `rus` 
        ? `и др.` 
        : `and etc.`
    ) 
    : ``

  return (
    <div
      className="card"
      data-cy="card"
    >
      <img
        src={bookCoverUrl}
        alt={title}
        className="card__image"
      />

      <div className="card__about">
        <div className="card__title">
          {title}
        </div>

        <div className="card__wrap">
          <div className="card__author">
            {firstAuthor} {suffix}
          </div>

          <div className="card__language">
            {language}
          </div>
        </div>
      </div>
    </div>
  )
})
