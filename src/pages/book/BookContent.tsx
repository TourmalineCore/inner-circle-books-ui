import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"
import ViewQRIcon from "../../assets/icons/View-qr.svg?react"
import InfoIcon from "../../assets/icons/Info.svg?react"

import clsx from 'clsx'
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import { Overlay } from '../../components/overlay/Overlay'
import { getEmployeeIdFromToken } from '../../common/tokenUtils'
import { returnBookRoutes } from '../routes'

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

  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 3)

  // formate date to DD.MM.YYYY format
  const day = String(currentDate.getDate())
    .padStart(2, `0`)
  const month = String(currentDate.getMonth() + 1)
    .padStart(2, `0`)
  const year = currentDate.getFullYear()

  const [
    isValidCopyId,
    setIsValidCopyId,
  ] = useState(false)

  useEffect(() => {
    // if copyId isn't passed or is not a number or is not in bookCopiesIds
    if (!copyId || isNaN(Number(copyId)) || !bookCopiesIds.includes(Number(copyId))) {
      return
    }

    setIsValidCopyId(true)
  }, [
    copyId,
    bookCopiesIds,
  ])

  // CustomCalendar props
  const [
    endCalendarDate,
    setEndCalendarDate,
  ] = useState<Date | null>(null)

  const onChangeCalendar = (dates: [Date, Date]) => {
    const [
      start,
      end,
    ] = dates

    if (end === null) {
      setEndCalendarDate(start)
    }
    else {
      setEndCalendarDate(end)
    }
  }

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
                scheduledReturnDate: currentDate
                  .toISOString()
                  .slice(0, 10),
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
                  {day}.{month}.{year}
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
        <div className='book__left'>
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

        <div className='book__right'>
          <div className='book__main-info-wrap'>
            <header className='book__title'>
              {title}
            </header>

            {employeesWhoReadNow.length > 0 && (
              <div className='book__readers'>
                <div className='book__readers-title'>
                    Reading Now
                  <span className='book__readers-list'>
                    {
                      employeesWhoReadNow
                        .map(reader => reader.fullName)
                        .join(`, `)
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className='book__wrap'>
            <ul className='book__characteristics'>
              <li className='book__field'>
                Author
                <span className='book__value'>
                  {
                    authors
                      .map(author => author.fullName)
                      .join(`, `)
                  }
                </span>
              </li>

              <li className='book__field'>
                Number of Copies
                <span className='book__value'>
                  {
                    bookState.count
                  }
                </span>
              </li>
              
              <li className='book__field'>
                Language
                <span className='book__value'>
                  {
                    language === `ru` 
                      ? `Russian` 
                      : `English`
                  }
                </span>
              </li>
            </ul>

            {
              isValidCopyId 
                ? (
                  <Button
                    onClick={() => {
                      isCurrentUserReadingThisCopy
                        ? window.location.href = `${returnBookRoutes[0].path}?copyId=${copyId}`
                        : setShowModal(true)
                    }}
                    label={
                      isCurrentUserReadingThisCopy
                        ? `Return Book`
                        : `Take Book`
                    }
                    className='book__take-button'
                    isAccent
                  />
                ) 
                : (
                  copyId 
                    ? (
                      <div className="book__take-info">
                        <InfoIcon />
                        <p className="book__take-info-text">
                          Copy of book doesn't exist, check the correctness of the QR code
                        </p>
                      </div>
                    ) 
                    : (
                      <div className="book__take-info">
                        <InfoIcon />
                        <p className="book__take-info-text">
                          You can take book after scanning the QR code on book cover
                        </p>
                      </div>
                    )
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
