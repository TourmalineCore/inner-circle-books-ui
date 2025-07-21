import './BooksCard.scss'

import NoImage from "../../../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../../../common/useImageValid'

export const BookCard = observer(({
  bookCoverUrl,
  title,
  authors,
  language,
}: BookCardType) => {
  const firstAuthor = authors[0]?.fullName
  const suffix = authors.length > 1 
    ? (
      language === `ru` 
        ? `и др.` 
        : `and etc.`
    ) 
    : ``
  const isValidUrl = useImageValid(bookCoverUrl)

  return (
    <div
      className="book-card"
      data-cy="book-card"
    >
      <img
        src={isValidUrl 
          ? bookCoverUrl 
          : NoImage
        }
        alt={title}
        className="book-card__image"
        data-cy="book-card-image"
      />

      <div className="book-card__about">
        <div className="book-card__title">
          {title}
        </div>

        <div className="book-card__wrap">
          <div className="book-card__author">
            {firstAuthor} {suffix}
          </div>

          <div className="book-card__language">
            {language}
          </div>
        </div>
      </div>
    </div>
  )
})
