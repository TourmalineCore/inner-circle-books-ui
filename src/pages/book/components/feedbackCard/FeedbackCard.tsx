/* eslint-disable array-bracket-newline */
/* eslint-disable array-element-newline */
import './FeedbackCard.scss'

import clsx from 'clsx'
import Star from '../../../../assets/icons/Star.svg?react'
import { ProgressOfReading } from '../../../../common/enums/progressOfReading'
import AvatarImg from '../../../../assets/img/avatar.png'

export const FeedbackCard = ({
  employeeFullName,
  leftFeedbackAtUtc,
  rating,
  progressOfReading,
  advantages,
  disadvantages,
}: Feedback) => {
  const isFinished = progressOfReading === ProgressOfReading.ReadEntirely
  const isReadPartially = progressOfReading === ProgressOfReading.ReadPartially

  const progressLabel = isFinished ? `Finished` : `Read in Part`

  return (
    <div 
      className="feedback-card"
      data-cy="feedback-card"
    >
      <div className="feedback-card__wrapper">
        <div className="feedback-card__header">
          <img
            src={AvatarImg}
            alt="Avatar"
            className="feedback-card__avatar"
          />
          <div>
            <div 
              className="feedback-card__name"
              data-cy="feedback-card-name"
            >
              {employeeFullName}
            </div>

            <div className="feedback-card__date">
              {leftFeedbackAtUtc}
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
            {[1,2,3,4,5].map((star) => (
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