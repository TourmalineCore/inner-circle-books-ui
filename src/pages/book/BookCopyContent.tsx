import './BookCopyContent.scss'

import { observer } from "mobx-react-lite"
import { useContext, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Overlay } from '../../components/overlay/Overlay'
import { useCopyIdValidation } from './utils/useCopyIdValidation'
import { useBookDates } from './utils/useBookDates'
import { useCalendar } from './utils/useCalendar'
import { Button } from '../../components/button/Button'
import { getEmployeeIdFromToken } from '../../common/tokenUtils'
import { returnBookRoutes } from '../routes'
import { useSearchParams } from 'react-router-dom'
import { BookLayout } from './components/book-layout/BookLayout'

export const BookCopyContent = observer(({
  copyId,
  onTake,
}: {
  copyId: string,
  onTake: ({
    bookCopyId, 
    scheduledReturnDate, 
  }: TakeBookType,
  ) => unknown,
}) => {
  const bookCopyState = useContext(BookStateContext)

  const [
    searchParams,
  ] = useSearchParams()
      
  const secretKey = searchParams.get(`s`)

  const {
    book: {
      title,
      annotation,
      language,
      knowledgeAreas,
      authors,
      coverUrl,
      bookCopiesIds,
      employeesWhoReadNow,
    },
    feedback,
    count,
  } = bookCopyState

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
    copyId,
    bookCopiesIds,
  })

  const {
    endCalendarDate, 
    onChangeCalendar, 
  } = useCalendar()

  const isCurrentUserReadingThisCopy = employeesWhoReadNow.some(
    (reader) => reader.employeeId === getEmployeeIdFromToken() && reader.bookCopyId === Number(copyId),
  )
  
  return (
    <div 
      className='book-copy'
      data-cy='book-copy-page'
    >
      {
        showModal && (
          <Overlay 
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

      <BookLayout
        coverUrl={coverUrl}
        title={title}
        employeesWhoReadNow={employeesWhoReadNow}
        authors={authors}
        language={language}
        knowledgeAreas={knowledgeAreas}
        count={count}
        annotation={annotation}
        feedback={feedback}
        actionSlot={
          <div className='book-copy__action'>
            { 
              isValidCopyId 
                ? (
                  <Button
                    data-cy='book-action-button'
                    onClick={() => {
                      isCurrentUserReadingThisCopy
                        ? window.location.href = `${returnBookRoutes[0].path.replace(`:id`, String(copyId))}?s=${secretKey}`
                        : setShowModal(true)
                    }}
                    label={
                      isCurrentUserReadingThisCopy
                        ? `Return Book`
                        : `Take Book`
                    }
                    className='book-copy__button'
                    isAccent
                  />
                ): (
                  <div className="book-copy__take-info">
                    <p className="book-copy__take-info-text">
                      Copy of book does not exist, check the correctness of the QR code
                    </p>
                  </div>
                )}
          </div>
        }
      />
    </div>
  )
})
