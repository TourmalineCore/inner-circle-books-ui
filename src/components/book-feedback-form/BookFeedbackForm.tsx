import './BookFeedbackForm.scss'

import clsx from 'clsx'
import NoImage from "../../assets/img/no-image.png"

import { RatingInput } from './components/RatingInput'
import { Button } from '../button/Button'
import { PROGRESS_OPTIONS } from '../../common/enums/progressOfReading'
import { useImageValid } from '../../common/useImageValid'

type BookFeedbackFormProps = {
  title: string,
  coverUrl: string,
  progressOfReading: string,
  rating: number,
  advantages: string,
  disadvantages: string,
  acceptButtonLabel: string,
  setProgressOfReading: ({
    progressOfReading,
  }: {
    progressOfReading: string,
  }) => unknown,
  setRating: ({
    rating,
  }: {
    rating: number,
  }) => unknown,
  setAdvantages: ({
    advantages,
  }: {
    advantages: string,
  }) => unknown,
  setDisadvantages: ({
    disadvantages,
  }: {
    disadvantages: string,
  }) => unknown,
  handleCancel: () => unknown,
  onSubmit: () => unknown,
  isProgressOfReadingError: boolean,
  isRatingError: boolean,
  isFeedbackDisabled: boolean,
  isSaving: boolean,
}

export function BookFeedbackForm({
  title,
  coverUrl,
  progressOfReading,
  rating,
  advantages,
  disadvantages,
  acceptButtonLabel,
  setProgressOfReading,
  setRating,
  setAdvantages,
  setDisadvantages,
  handleCancel,
  onSubmit,
  isProgressOfReadingError,
  isRatingError,
  isFeedbackDisabled,
  isSaving,
}: BookFeedbackFormProps) {
  const isValidUrl = useImageValid(coverUrl)

  return (
    <form 
      className="book-feedback-form"
      data-cy="book-feedback-form"
    >
      <div className="book-feedback-form__info">
        <img
          className="book-feedback-form__image"
          data-cy="book-feedback-form-image"
          src={isValidUrl 
            ? coverUrl 
            : NoImage
          }
          alt={title}
        />
        <div className="book-feedback-form__title">
          {title.length > 128 
            ? `${title.slice(0, 128)}..` 
            : title}
        </div>
      </div>
      
      <div className="book-feedback-form__progress">
        <label className="book-feedback-form__label">
            Specify your reading progress*
        </label>
        <div className={clsx(`book-feedback-form__progress-options`, {
          'error': isProgressOfReadingError,
        })}
        >
          {PROGRESS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={clsx(`book-feedback-form__progress-btn`, {
                'active': progressOfReading === option.value,
              })}
              onClick={() => setProgressOfReading({
                progressOfReading: option.value, 
              })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="book-feedback-form__rating"
      >
        <label className={clsx(`book-feedback-form__label`, {
          'disabled': isFeedbackDisabled,
        })}>
            Rate the book*
        </label>
        <RatingInput
          value={rating}
          onChange={(value: number) => setRating({
            rating: value, 
          })
          }
          error={isRatingError}
          disabled={isFeedbackDisabled}
        />
      </div>
      <div className="book-feedback-form__feedback">
        <div className={clsx(`book-feedback-form__label`, {
          'disabled': isFeedbackDisabled,
        })}>
            What Do You Think about this Book?
        </div>
        <div className={clsx(`book-feedback-form__feedback-label `, {
          'disabled': isFeedbackDisabled,
        })}>
            Leave your feedback to let your colleagues know your opinion
        </div>
        <div className='book-feedback-form__feedback-fields'>
          <textarea
            className='book-feedback-form__feedback-field'
            data-cy="book-feedback-form-advantages"
            value={advantages}
            placeholder="Advantages"
            onChange={(e) => setAdvantages({
              advantages: e.target.value,
            })}
            disabled={isFeedbackDisabled}
          />
          <textarea
            className='book-feedback-form__feedback-field'
            data-cy="book-feedback-form-disadvantages"
            value={disadvantages}
            placeholder="Disadvantages"
            onChange={(e) => setDisadvantages({
              disadvantages: e.target.value,
            })}
            disabled={isFeedbackDisabled}
          />
        </div>
      </div>
      <div className="book-feedback-form__actions">
        <Button 
          onClick={handleCancel}
          label="Cancel"
        />
      
        <Button 
          onClick={onSubmit}
          label={acceptButtonLabel}
          isAccent
          isDisable={isSaving}
          isLoader={isSaving}
        />
      </div>
    </form>
  )
}