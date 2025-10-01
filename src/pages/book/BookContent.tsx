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
import { LINK_TO_BOOKS_SERVICE } from '../../common/config/config'

export const BookContent = observer(({
  bookId,
}: {
  bookId: string,
}) => {
  const bookState = useContext(BookStateContext)
  const {
    book,
  } = bookState 

  const {
    title,
    annotation,
    language,
    authors,
    coverUrl,
  } = book

  const isValidUrl = useImageValid(coverUrl)

  const [
    showModal,
    setShowModal,
  ] = useState(false)
  
  const handleCloseModal = () => {
    setShowModal(false)
  }
  
  return (
    <>
      {
        showModal && (
          <Overlay 
            onPrint={() => {}}
            onCloseModal={handleCloseModal}
          />
        )
      }

      <div 
        className="book"
        data-cy="book"
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

          <div className='book__buttons'>
            <Button
              onClick={() => window.location.href = `${LINK_TO_BOOKS_SERVICE}history/${bookId}`}
              label={
                <>
                  <ClockIcon /> Book Tracking
                </>
              }
              isOutline
            />

            <Button
              onClick={() => setShowModal(true)}
              label={
                <>
                  <ViewQRIcon /> View QR Code
                </>
              }
              isOutline
            />
          </div>
        </div>

        <div className='book__right'>
          <header className='book__title'>
            {title}
          </header>

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
        
            <Button 
              onClick={() => {}}
              label="Take Book"
              className='book__take-button'
              isAccent
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
