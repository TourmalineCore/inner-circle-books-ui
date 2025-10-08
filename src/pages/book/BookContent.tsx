import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"
import ViewQRIcon from "../../assets/icons/View-qr.svg?react"
import InfoIcon from "../../assets/icons/Info.svg?react"

import clsx from 'clsx'
import { observer } from "mobx-react-lite"
import { useContext, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import { Overlay } from '../../components/overlay/Overlay'
import { getEmployeeIdFromToken } from '../../common/tokenUtils'
import { returnBookRoutes } from '../routes'
import { useCopyIdValidation } from './utils/useCopyIdValidation'
import { useBookDates } from './utils/useBookDates'
import { useCalendar } from './utils/useCalendar'
import { BookInfo } from './components/book-info/BookInfo'
import { BookReaders } from './components/book-readers/BookReaders'

export const BookContent = observer(({
  copyId,
  onTake,
}: {
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
      bookCopies,
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
    bookCopies: bookCopies,
  })

  const {
    endCalendarDate, 
    onChangeCalendar, 
  } = useCalendar()

  const isCurrentUserReadingThisCopy = employeesWhoReadNow.some(
    (reader) => reader.employeeId === getEmployeeIdFromToken() && reader.bookCopyId === Number(copyId),
  )

  return (
    <>
      {
        showModalQRForm && (
          <Overlay 
            onAccentButtonAction={() => {}} // TODO: change when add print flow
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

            {
              isValidCopyId 
                ? (
                  <Button
                    onClick={() => {
                      isCurrentUserReadingThisCopy
                        ? window.location.href = `${returnBookRoutes[0].path.replace(`:id`, String(copyId))}`
                        : setShowModal(true)
                    }}
                    label={
                      isCurrentUserReadingThisCopy
                        ? `Return Book`
                        : `Take Book`
                    }
                    className='book__button'
                    isAccent
                  />
                ) 
                : (
                  <div className="book__take-info">
                    <InfoIcon />
                    <p className="book__take-info-text">
                      {
                        copyId 
                          ? `Copy of book does not exist, check the correctness of the QR code` 
                          : `You can take book after scanning the QR code on book cover`
                      }
                    </p>
                  </div>
                )
            }
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
