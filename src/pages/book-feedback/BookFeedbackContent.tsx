import { observer } from "mobx-react-lite"
import { useContext, useState } from 'react'
import { Overlay } from '../../components/overlay/Overlay'
import { BookFeedbackForm } from '../../components/book-feedback-form/BookFeedbackForm'
import { BookFeedbackStateContext } from './state/BookFeedbackStateContext'
import { PROGRESS_OPTIONS, ProgressOfReading } from "../../common/enums/progressOfReading"

export const BookFeedbackContent = observer(({
  onSubmit,
  goToPreviousPage,
}:{
  onSubmit: () => unknown,
  goToPreviousPage: () => unknown,
}) => {
  const bookFeedbackState = useContext(BookFeedbackStateContext)

  const {
    book,
    bookFeedback,
    isSaving,
    errors,
    isFeedbackDisabled,
  } = bookFeedbackState

  const {
    title,
    coverUrl,
  } = book

  const {
    advantages,
    disadvantages,
    rating,
    progressOfReading,
  } = bookFeedback

  const {
    isRatingError,
    isProgressOfReadingError,
  } = errors
  
  const [
    showModal,
    setShowModal,
  ] = useState(false)
  
  const handleConfirmQuit = () => {
    setShowModal(false)

    goToPreviousPage()
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    if (bookFeedbackState.isSomethingFilledWithinTheForm()) {
      setShowModal(true)
    }
    else {
      goToPreviousPage() 
    }
  }

  return (
    <>
      {
        showModal && (
          <Overlay 
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
      <BookFeedbackForm
        title={title}
        coverUrl={coverUrl}
        progressOfReading={progressOfReading}
        rating={rating}
        advantages={advantages}
        disadvantages={disadvantages}
        acceptButtonLabel={isSaving 
          ? `Sending` 
          : `Send`
        }
        progressOfReadingOptions={PROGRESS_OPTIONS.filter((item) => item.value !== ProgressOfReading.NotReadAtAll)}
        setProgressOfReading={({
          progressOfReading,
        }) => bookFeedbackState.setProgressOfReading({
          progressOfReading,
        })}
        setRating={({
          rating,
        }) => bookFeedbackState.setRating({
          rating,
        })}
        setAdvantages={({
          advantages,
        }) => bookFeedbackState.setAdvantages({
          advantages,
        })}
        setDisadvantages={({
          disadvantages,
        }) => bookFeedbackState.setDisadvantages({
          disadvantages,
        })}
        handleCancel={handleCancel}
        onSubmit={onSubmit}
        isProgressOfReadingError={isProgressOfReadingError}
        isRatingError={isRatingError}
        isFeedbackDisabled={isFeedbackDisabled}
        isSaving={isSaving}
      />
    </>
  )
})
