import './ReturnBookContent.scss'

import NoImage from "../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../common/useImageValid'
import { Button } from '../../components/button/Button'
import { ReturnBookStateContext } from './state/ReturnBookStateContext'
import { useContext, useState } from 'react'
import { Overlay } from '../../components/overlay/Overlay'
import { ProgressOfReading } from '../../common/enums/progressOfReading'

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
    returnBookState.reset()
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
      
        <div className="return-book__feedback">
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
