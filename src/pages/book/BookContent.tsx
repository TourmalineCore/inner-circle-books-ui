import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"
import ViewQRIcon from "../../assets/icons/View-qr.svg?react"
import InfoIcon from "../../assets/icons/Info.svg?react"

import clsx from 'clsx'
import { observer } from "mobx-react-lite"
import { useSearchParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import { Overlay } from '../../components/overlay/Overlay'

export const BookContent = observer(() => {
  const bookState = useContext(BookStateContext)

  const {
    book: {
      title,
      annotation,
      language,
      authors,
      coverUrl,
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
    searchParams,
  ] = useSearchParams()
  const copyId = searchParams.get(`copyId`)

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
            onAccentButtonAction={() => {}} // TODO: change when add take book request
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
            onAccentButtonAction={() => {}} // TODO: change when add take book request
            onButtonAction={() => setShowModalCalendar(false)}
            onCloseModal={() => {
              setShowModalCalendar(false)
              setShowModal(false)
            }}
            modalName='modalCalendar'
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
        
            {
              copyId ? (
                <Button
                  onClick={() => setShowModal(true)}
                  label="Take Book"
                  className='book__take-button'
                  isAccent
                />
              ) : (
                <div className="book__take-info">
                  <InfoIcon />
                  <p className="book__take-info--text">
                    You can take book after scanning the QR code on book cover
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
