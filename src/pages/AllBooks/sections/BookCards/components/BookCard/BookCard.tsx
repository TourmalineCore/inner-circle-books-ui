import './BooksCard.scss'

import NoImage from "../../../../../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../../../../../common/useImageValid'

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
  const isValidUrl = useImageValid(bookCoverUrl)

  return (
    <div
      className="card"
      data-cy="card"
    >
      <img
        src={isValidUrl 
          ? bookCoverUrl 
          : NoImage
        }
        alt={title}
        className="card__image"
        data-cy="card-image"
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
