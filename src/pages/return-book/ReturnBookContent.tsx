import './ReturnBookContent.scss'

import NoImage from "../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../common/useImageValid'
import { Button } from '../../components/button/Button'
import { ReturnBookStateContext } from './state/ReturnBookStateContext'
import { useContext, useState } from 'react'
import { Overlay } from '../../components/overlay/Overlay'
import { ProgressOfReading } from '../../common/enums/progressOfReading'
import { RatingInput } from './components/RatingInput'

const progressOptions = [
  {
    value: ProgressOfReading.NotReadAtAll,
    label: `Not Read At All`, 
  },
  {
    value: ProgressOfReading.ReadPartially,
    label: `Read Partially`, 
  },
  {
    value: ProgressOfReading.ReadEntirely,
    label: `Read Entirely`, 
  },
]

export const ReturnBookContent = observer(({
  title,
  coverUrl,
  onSubmit,
  goToBookCopyPage,
}:{
  title: string,
  coverUrl: string,
  onSubmit: () => unknown,
  goToBookCopyPage: () => unknown,
}) => {
  const returnBookState = useContext(ReturnBookStateContext)
  
  const isValidUrl = useImageValid(coverUrl)

  const [
    showModal,
    setShowModal,
  ] = useState(false)
  
  const handleConfirmQuit = () => {
    setShowModal(false)

    goToBookCopyPage()
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    if (returnBookState.isSomethingFilledWithinTheForm()) {
      setShowModal(true)
    }
    else {
      goToBookCopyPage() 
    }
  }

  return (
    <>
      {
        showModal && (
          <Overlay 
            data-cy="add-book-overlay"
            onAccentButtonAction={handleConfirmQuit}
            onButtonAction={handleCloseModal}
            modalName='modal'
            title="Do You Want to Quit this&nbsp;Page?"
            text="The data you have entered will not&nbsp;be saved"
            buttonLabel="No, Stay Here"
            accentButtonLabel="Yes, Quit"
          />
        )
      }

      <form 
        className="return-book"
        data-cy="return-book"
      >
        <div className="return-book__info">
          <img
            className="return-book__image"
            data-cy="return-book-image"
            src={isValidUrl 
              ? coverUrl 
              : NoImage
            }
            alt={title}
          />
          <div className="return-book__title">
            {title.length > 128 
              ? `${title.slice(0, 128)}..` 
              : title}
          </div>
        </div>
      
        <div className="return-book__progress">
          <label className="return-book__label">
            Specify your reading progress*
          </label>
          <div className={`return-book__progress-options ${returnBookState.errors.isProgressOfReadingError
            ? `error` 
            : ``}`}
          >
            {progressOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`return-book__progress-btn ${returnBookState.book.progressOfReading === option.value 
                  ? `active` 
                  : ``}`}
                onClick={() => returnBookState.setProgressOfReading({
                  progressOfReading: option.value, 
                })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`return-book__rating ${returnBookState.errors.isRatingError
          ? `error` 
          : ``}`}
        >
          <label className="return-book__label">
              Rate the book*
          </label>
          <RatingInput
            value={returnBookState.book.rating}
            onChange={(value:number) =>
              returnBookState.setRating({
                rating: value, 
              })
            }
          />
        </div>
        <div className="return-book__feedback">
          <div className='return-book__label'>
            What Do You Think about this Book?
          </div>
          <div className='return-book__feedback-label'>
            Leave your feedback to let your colleagues know your opinion
          </div>
          <div className='return-book__feedback-fields'>
            <textarea
              className='return-book__feedback-field'
              data-cy="return-book-advantages"
              value={returnBookState.book.advantages}
              placeholder="Advantages"
              onChange={(e) => returnBookState.setAdvantages({
                advantages: e.target.value,
              })}
            />
            <textarea
              className='return-book__feedback-field'
              data-cy="return-book-disadvantages"
              value={returnBookState.book.disadvantages}
              placeholder="Disadvantages"
              onChange={(e) => returnBookState.setDisadvantages({
                disadvantages: e.target.value,
              })}
            />
          </div>
        </div>
        <div className="return-book__actions">
          <Button 
            onClick={handleCancel}
            label="Cancel"
          />
      
          <Button 
            onClick={() => onSubmit()}
            label={returnBookState.isSaving 
              ? `Returning` 
              : `Return Book`}
            isAccent
            isDisable={returnBookState.isSaving}
            isLoader={returnBookState.isSaving}
          />
        </div>
      </form>
    </>
  )
})
