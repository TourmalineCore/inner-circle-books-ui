import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"
import ViewQRIcon from "../../assets/icons/View-qr.svg?react"
import ClockIcon from "../../assets/icons/Clock.svg?react"

import clsx from 'clsx'
import { observer } from "mobx-react-lite"
import { useContext, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import { Overlay } from '../../components/overlay/Overlay'
import { useCopyIdValidation } from './utils/useCopyIdValidation'
import { useBookDates } from './utils/useBookDates'
import { useCalendar } from './utils/useCalendar'
import { BookInfo } from './components/book-info/BookInfo'
import { BookReaders } from './components/book-readers/BookReaders'
import { BookActionButton } from './components/book-action-button/BookActionButton'
import { LINK_TO_BOOKS_SERVICE } from '../../common/config/config'
import { hasAccessPermission } from '../../common/tokenUtils'

export const BookContent = observer(({
  bookId,
  copyId,
  onTake,
}: {
  bookId: string,
  copyId?: string,
  onTake: ({
    bookCopyId, 
    scheduledReturnDate, 
  }: TakeBookType,
  ) => unknown,
}) => {
  const bookState = useContext(BookStateContext)

  const {
    book: {
      title,
      annotation,
      language,
      authors,
      coverUrl,
      bookCopiesIds,
      employeesWhoReadNow,
    },
  } = bookState

  const isValidUrl = useImageValid(coverUrl)

  const [
    showModalQRForm,
    setShowModalQRForm,
  ] = useState(false)

  const [
    showModal,
    setShowModal,
  ] = useState(false)

  const [
    showModalCalendar,
    setShowModalCalendar,
  ] = useState(false)

  const {
    formattedDate, 
    isoDate, 
  } = useBookDates()

  const isValidCopyId = useCopyIdValidation({
    copyId: copyId,
    bookCopiesIds: bookCopiesIds,
  })

  const {
    endCalendarDate, 
    onChangeCalendar, 
  } = useCalendar()
  
  return (
    <>
      {
        showModalQRForm && (
          <Overlay 
            // An empty function is not an error, the accept button handler is contained inside modalQrForm
            onAccentButtonAction={() => {}}
            modalName='modalQRForm'
            onCloseModal={() => setShowModalQRForm(false)}
          />
        )
      }

      {
        showModal && (
          <Overlay 
            data-cy="book-modal"
            onAccentButtonAction={() => {
              onTake({
                bookCopyId: Number(copyId),
                scheduledReturnDate: isoDate,
              })
              setShowModal(false)
            }}
            onButtonAction={() => setShowModalCalendar(true)}
            onCloseModal={() => setShowModal(false)}
            modalName='modal'
            title="When you are Going to&nbsp;Return Book to&nbsp;the Library?"
            text={
              <>
                You can choose the date in the next step or the date{` `}
                <span className='text-accent'>
                  {formattedDate}
                </span>
                {` `}will be selected automatically
              </>
            }
            buttonLabel="Choose the Return Date"
            accentButtonLabel="Take Book"
            hasCloseButton
          />
        )
      }

      {
        showModalCalendar && (
          <Overlay 
            onAccentButtonAction={() => {
              onTake({
                bookCopyId: Number(copyId),
                scheduledReturnDate: endCalendarDate!
                  .toISOString()
                  .slice(0, 10),
              })
              setShowModalCalendar(false)
              setShowModal(false)
            }}
            onButtonAction={() => setShowModalCalendar(false)}
            onCloseModal={() => {
              setShowModalCalendar(false)
              setShowModal(false)
            }}
            modalName='modalCalendar'
            endCalendarDate={endCalendarDate}
            onChangeCalendar={onChangeCalendar}
          />
        )
      }

      <div 
        className="book"
        data-cy="book-page"
      >
        <div>
          <img
            src={isValidUrl 
              ? coverUrl 
              : NoImage
            }
            alt="Preview"
            className={clsx(`book__cover`, { 
              'book__cover--no-image': !isValidUrl,
            })}
          />

          {hasAccessPermission({
            permission: `CanManageBooks`,
          }) && <div className='book__buttons'>
            {!copyId && <Button
              data-cy='book-tracking-button'
              onClick={() => window.location.href = `${LINK_TO_BOOKS_SERVICE}history/${bookId}`}
              label={
                <>
                  <ClockIcon /> Book Tracking
                </>
              }
              isOutline
            />}

            <Button
              onClick={() => setShowModalQRForm(true)}
              label={
                <>
                  <ViewQRIcon /> View QR Code
                </>
              }
              isOutline
            />
          </div>
          }
        </div>

        <div>
          <div className='book__main-info-wrap'>
            <header className='book__title'>
              {title}
            </header>

            <BookReaders employeesWhoReadNow={employeesWhoReadNow} />
          </div>

          <div className='book__wrap'>
            <BookInfo 
              authors={authors}
              language={language}
              count={bookState.count} 
            />

            <BookActionButton
              copyId={copyId}
              employeesWhoReadNow={employeesWhoReadNow}
              setShowModal={setShowModal}
              isValidCopyId={isValidCopyId}
            />
          </div>

          <h5 className='book__section-name'>
            Annotation
          </h5>
          <div className='book__annotation'>
            {annotation}
          </div>
        </div>
      </div>
    </>
  )
})
