import './FeedbackCard.scss'

import moment from "moment"
import clsx from 'clsx'
import Star from '../../../../assets/icons/Star.svg?react'
import { ProgressOfReading } from '../../../../common/enums/progressOfReading'
import Avatar from '../../../../assets/img/avatar.png'
import { PROGRESS_OPTIONS } from '../../../../common/constant'

export function FeedbackCard({
  employeeFullName,
  leftFeedbackAtUtc,
  rating,
  progressOfReading,
  advantages,
  disadvantages,
}: Feedback) {
  const isFinished = progressOfReading === ProgressOfReading.ReadEntirely
  const isReadPartially = progressOfReading === ProgressOfReading.ReadPartially

  const progressLabel = PROGRESS_OPTIONS.find(
    (option) => option.value === progressOfReading,
  )?.label

  const numberOfStars = Array.from({
    length: 5, 
  }, (_, i) => i + 1)

  return (
    <div 
      className="feedback-card"
      data-cy="feedback-card"
    >
      <div className="feedback-card__wrapper">
        <div className="feedback-card__header">
          <img
            src={Avatar}
            alt="Avatar"
            className="feedback-card__avatar"
          />
          <div>
            <div 
              className="feedback-card__full-name"
              data-cy="feedback-card-fullname"
            >
              {employeeFullName}
            </div>

            <div 
              className="feedback-card__date"
              data-cy="feedback-card-date"
            >
              {moment(leftFeedbackAtUtc)
                .format(`YYYY-MM-DD`)}
            </div>
          </div>
        </div>

        <div className="feedback-card__metadata">
          <div
            className="feedback-card__status"
            data-cy="feedback-card-status"
          >
            <span className={clsx(`feedback-card__dot`, {
              'feedback-card__dot--finished': isFinished,
              'feedback-card__dot--partial': isReadPartially,
            })}/>
            {progressLabel}
          </div>

          <div 
            className="feedback-card__rating"
            data-cy="feedback-card-rating"
          >
            {numberOfStars.map((star) => (
              <Star
                key={star}
                className={clsx(
                  `feedback-card__star`,
                  {
                    'feedback-card__star--active': star <= rating, 
                  },
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="feedback-card__section">
        <div className="feedback-card__title">
          Advantages
        </div>
        <div 
          className="feedback-card__text"
          data-cy="feedback-card-advantages-text"
        >
          {advantages || `-`}
        </div>
      </div>

      <div className="feedback-card__section">
        <div className="feedback-card__title">
          Disadvantages
        </div>
        <div 
          className="feedback-card__text"
          data-cy="feedback-card-disadvantages-text"
        >
          {disadvantages || `-`}
        </div>
      </div>
    </div>
  )
}