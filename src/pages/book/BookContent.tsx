import './BookContent.scss'

import ViewQRIcon from "../../assets/icons/View-qr.svg?react"
import ClockIcon from "../../assets/icons/Clock.svg?react"
import ScanIcon from '../../assets/icons/Scan.svg?react'

import { observer } from "mobx-react-lite"
import { useContext } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { hasAccessPermission } from '../../common/tokenUtils'
import { LINK_TO_BOOKS_SERVICE } from '../../common/constant'
import { scanRoutes } from '../routes'
import { BookLayout } from './components/book-layout/BookLayout'

export const BookContent = observer(({
  bookId,
  openModalQrCode,
}: {
  bookId: string,
  openModalQrCode: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)

  const {
    book: {
      title,
      annotation,
      language,
      knowledgeAreas,
      authors,
      coverUrl,
      employeesWhoReadNow,
    },
    feedback,
    count,
  } = bookState
  
  return (
    <div
      className='book'
      data-cy='book-page'
    >
      <BookLayout
        bookId={bookId}
        coverUrl={coverUrl}
        title={title}
        employeesWhoReadNow={employeesWhoReadNow}
        authors={authors}
        language={language}
        knowledgeAreas={knowledgeAreas}
        count={count}
        annotation={annotation}
        feedback={feedback}
        underCoverSlot={
          <>
            {hasAccessPermission({
              permission: `CanManageBooks`,
            }) && (
              <div className='book__management-buttons'>
                <Button
                  data-cy='book-tracking-button'
                  onClick={() => window.location.href = `${LINK_TO_BOOKS_SERVICE}/history/${bookId}`}
                  label={
                    <>
                      <ClockIcon /> Book Tracking
                    </>
                  }
                  isOutline
                />

                <Button
                  onClick={openModalQrCode}
                  label={
                    <>
                      <ViewQRIcon /> View QR Code
                    </>
                  }
                  isOutline
                />
              </div>
            )}
          </>
        }
        actionSlot={
          <div className="book__take-info">
            <Button
              className="book__scan-button"
              onClick={() => window.location.href = scanRoutes[0].path}
              label={
                <>
                  <ScanIcon /> Scan QR
                </>
              }
              isAccent
            />
            <p className="book__take-info-text">
            You can take book after scanning the QR code on book cover
            </p>
          </div>
        }
      />
    </div>
  )
})
