import './BooksCard.scss'

import NoImage from "../../../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../../../common/useImageValid'
import { Language } from '../../../../common/enums/language'
import { AvailabilityStatusLabels } from '../../../../components/availability-status-labels/AvailabilityStatusLabels'

export const BookCard = observer(({
  title,
  language,
  authors,
  coverUrl,
  availabilityStatuses,
}: BookCardType) => {
  const firstAuthor = authors[0]?.fullName
  const suffix = authors.length > 1 
    ? (
      language === Language.RU
        ? `и др.` 
        : `and etc.`
    ) 
    : ``
  const isValidUrl = useImageValid(coverUrl)

  return (
    <div
      className="book-card"
      data-cy="book-card"
    >
      <div className="book-card__cover">
        <img
          src={isValidUrl 
            ? coverUrl 
            : NoImage
          }
          alt={title}
          className="book-card__image"
          data-cy="book-card-image"
        />

        <AvailabilityStatusLabels
          className="book-card__statuses"
          availabilityStatuses={availabilityStatuses}
        />
      </div>

      <div className="book-card__about">
        <div className="book-card__title">
          {title}
        </div>

        <div className="book-card__wrapper">
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
