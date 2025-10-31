import './ModalQRForm.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'
import PrintIcon from '../../../../assets/icons/Print.svg?react'
import CheckboxOnIcon from '../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../assets/icons/Checkbox-off.svg?react'

import { Button } from '../../../../components/button/Button'
import { ModalQRCard } from './components/modal-qr-card/ModalQRCard'
import { useContext, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { useReactToPrint } from "react-to-print"
import { PrintQr } from './components/print-qr/PrintQr'
import { ModalQrFormStateContext } from './state/ModalQrFormStateContext'
import { useAddDisableScrollClassOnBody } from '../../../../common/hooks/useAddDisableScrollClassOnBody'

export const ModalQRFormContent = observer(({
  onCloseModal,
}: {
  onCloseModal: () => unknown,
}) => {
  const modalQrFormState = useContext(ModalQrFormStateContext)

  const {
    modalQRFormData,
    bookCopiesCount,
  } = modalQrFormState

  useAddDisableScrollClassOnBody()

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
    modalQrFormState.resetSelectedCopies()

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
      <div className='modal-qr-form__inner'>
        <div className={clsx(`modal-qr-form__content`, {
          'modal-qr-form__content--has-single-item': bookCopiesCount === 1,
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
              bookCopiesCount > 1 
                ? `QR Codes for Books` 
                : `QR Code for Book`
            }
          </div>

          {
            bookCopiesCount > 1 && <button
              type="button"
              className="modal-qr-form__select-all-button"
              onClick={() => modalQrFormState.toggleSelectAllCopies({
                checked: !modalQrFormState.areAllCopiesSelected,
              })}
            >
              {
                modalQrFormState.areAllCopiesSelected 
                  ? <CheckboxOnIcon /> 
                  : <CheckboxOffIcon />
              }
              Select All ({bookCopiesCount})
            </button>
          }

          <div className={clsx(`modal-qr-form__cards`, {
            'modal-qr-form__cards--has-single-item': bookCopiesCount === 1,
          })}>
            {
              modalQRFormData.bookCopies.map(({
                bookCopyId,
                secretKey,
              }) => (
                <ModalQRCard
                  title={modalQRFormData.bookTitle}
                  bookCopyId={bookCopyId}
                  secretKey={secretKey}
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
            disabled={!modalQrFormState.selectedBookCopies.length}
            isAccent
          />
        </div>

        {/*A hidden element that is only visible when printing*/}
        <div 
          className='modal-qr-form__print-qr'
          ref={contentRef}
        >
          {modalQrFormState
            .selectedBookCopies 
            .map(({
              bookCopyId, 
              secretKey,
            }) => (
              <div key={bookCopyId}>
                <PrintQr
                  title={modalQRFormData.bookTitle}
                  bookCopyId={bookCopyId}
                  secretKey={secretKey}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
})