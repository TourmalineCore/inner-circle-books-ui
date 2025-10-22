import './ModalQRForm.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'
import PrintIcon from '../../../../assets/icons/Print.svg?react'
import CheckboxOnIcon from '../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../assets/icons/Checkbox-off.svg?react'

import { Button } from '../../../../components/button/Button'
import { ModalQRCard } from './components/modal-qr-card/ModalQRCard'
import { useContext, useRef, useState } from 'react'
import { BookStateContext } from '../../state/BookStateStateContext'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { useReactToPrint } from "react-to-print"
import { PrintQr } from './components/print-qr/PrintQr'

export const ModalQRForm = observer(({
  onCloseModal,
}: {
  onCloseModal: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)
  
  const isMobile = useMediaQuery({
    maxWidth: 767,
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef, 
  })

  const [
    isClosing,
    setIsClosing,
  ] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    bookState.resetSelectedCopies()

    if (isMobile) {
      setTimeout(onCloseModal, 400) // Close after end of animation
    }
    else {
      onCloseModal()
    }
  }
  
  return (
    <div 
      className={clsx(`modal-qr-form`, {
        'modal-qr-form--closing': isClosing,
      })}
      data-cy="modal-qr-form"
    >
      <div className={clsx(`modal-qr-form__content`, {
        'modal-qr-form__content--has-single-item': bookState.count === 1,
      })}>
        <button
          type="button"
          className="modal-qr-form__close-button"
          onClick={handleClose}
        >
          <CancelIcon />
        </button>
      
        <div className="modal-qr-form__title">
          {
            bookState.count > 1 
              ? `QR Codes for Books` 
              : `QR Code for Book`
          }
        </div>

        {
          bookState.count > 1 && <button
            type="button"
            className="modal-qr-form__select-all-button"
            onClick={() => bookState.toggleSelectAllCopies({
              checked: !bookState.areAllCopiesSelected,
            })}
          >
            {
              bookState.areAllCopiesSelected 
                ? <CheckboxOnIcon /> 
                : <CheckboxOffIcon />
            }
              Select All ({bookState.count})
          </button>
        }

        <div className={clsx(`modal-qr-form__cards`, {
          'modal-qr-form__cards--has-single-item': bookState.count === 1,
        })}>
          {
            bookState.book.bookCopies.map(({
              copyNumber,
              bookCopyId,
            }) => (
              <ModalQRCard
                copyNumber={copyNumber}
                title={bookState.book.title}
                bookCopyId={bookCopyId}
              />
            ))
          }
        </div>
      </div>

      <div className='modal-qr-form__print-button-container'>
        <Button 
          onClick={reactToPrintFn}
          className='modal-qr-form__print-button'
          label={
            <>
              <PrintIcon /> Print
            </>
          }
          disabled={!bookState.selectedBookCopies.length}
          isAccent
        />
      </div>

      {/*A hidden element that is only visible when printing*/}
      <div 
        className='modal-qr-form__print-qr'
        ref={contentRef}
      >
        {bookState
          .selectedBookCopies 
          .map(({
            bookCopyId, 
          }) => (
            <div key={bookCopyId}>
              <PrintQr
                title={bookState.book.title}
                bookCopyId={bookCopyId}
              />
            </div>
          ))}
      </div>
    </div>
  )
})