import './ReturnBookContent.scss'

import NoImage from "../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../common/useImageValid'
import { Button } from '../../components/button/Button'
import { ReturnBookStateContext } from './state/ReturnBookStateContext'
import { useContext, useState } from 'react'
import { Overlay } from '../../components/overlay/Overlay'
import { useSearchParams } from 'react-router-dom'
import { ProgressOfReading } from '../../common/enums/progressOfReading'

export const ReturnBookContent = observer(({
  title,
  coverUrl,
  onSubmit,
  goToBookCopyPage,
}:{
  title: string,
  coverUrl: string,
  onSubmit: ({
    bookCopyId, 
    progressOfReading, 
  }: ReturnBookType,
  ) => unknown,
  goToBookCopyPage: ({
    copyId,
  }: {
    copyId: string,
  }) => unknown,
}) => {
  const returnBookState = useContext(ReturnBookStateContext)
  
  const isValidUrl = useImageValid(coverUrl)

  const [
    searchParams,
  ] = useSearchParams()
  const copyId = searchParams.get(`copyId`)

  const [
    showModal,
    setShowModal,
  ] = useState(false)
  
  const handleConfirmQuit = () => {
    returnBookState.reset()
    setShowModal(false)

    goToBookCopyPage({
      copyId: copyId!,
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    if (returnBookState.isSomethingFilledWithinTheForm()) {
      setShowModal(true)
    }
    else {
      goToBookCopyPage({
        copyId: copyId!,
      }) 
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
            : ``}`}>
            <button 
              type="button"
              className="return-book__progress-btn"
              onClick={() => returnBookState.setProgressOfReading({
                progressOfReading: ProgressOfReading.NotReadAtAll,
              })}
            >
              Not Read At All
            </button>
            <button 
              type="button"
              className="return-book__progress-btn"
              onClick={() => returnBookState.setProgressOfReading({
                progressOfReading: ProgressOfReading.ReadPartially,
              })}
            >
              Read Partially
            </button>
            <button 
              type="button"
              className="return-book__progress-btn"
              onClick={() => returnBookState.setProgressOfReading({
                progressOfReading: ProgressOfReading.ReadEntirely,
              })}
            >
              Read Entirely
            </button>
          </div>
        </div>

        <div className="return-book__actions">
          <Button 
            onClick={handleCancel}
            label="Cancel"
          />
      
          <Button 
            onClick={() => onSubmit({
              bookCopyId: Number(copyId),
              progressOfReading: returnBookState.book.progressOfReading,
            })}
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
