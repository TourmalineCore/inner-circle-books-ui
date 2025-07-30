import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"
import ViewQRIcon from "../../assets/icons/View-qr.svg?react"

import clsx from 'clsx'
import { observer } from "mobx-react-lite"
import { useContext, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import { Overlay } from '../../components/overlay/Overlay'

export const BookContent = observer(() => {
  const {
    book,
  } = useContext(BookStateContext)

  const {
    title,
    annotation,
    language,
    authors,
    bookCoverUrl,
    bookCopies,
  } = book

  const isValidUrl = useImageValid(bookCoverUrl)

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
              ? bookCoverUrl 
              : NoImage
            }
            alt="Preview"
            className={clsx(`book__cover`, { 
              'book__cover--no-image': !isValidUrl,
            })}
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
                    bookCopies.length
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
