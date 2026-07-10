import './ModalQRForm.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'
import PrintIcon from '../../../../assets/icons/Print.svg?react'
import CheckboxOnIcon from '../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../assets/icons/Checkbox-off.svg?react'
import PlusIcon from '../../../../assets/icons/Plus.svg?react'

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
import { Overlay } from '../../../../components/overlay/Overlay'

export const ModalQRFormContent = observer(({
  loadModalQrFormDataAsync,
  addBookCopyAsync,
  onCloseModal,
}: {
  loadModalQrFormDataAsync: () => unknown,
  addBookCopyAsync: () => unknown,
  onCloseModal: () => unknown,
}) => {
  const modalQrFormState = useContext(ModalQrFormStateContext)

  const {
    isSaving,
    modalQRFormData,
    bookCopiesCount,
  } = modalQrFormState

  const [
    showModal,
    setShowModal,
  ] = useState(false)

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

  const handleAcceptAddBookCopy = async () => {
    setShowModal(false)
    await addBookCopyAsync()
    await loadModalQrFormDataAsync()
  }
  
  return (
    <>
      {
        showModal && (
          <Overlay 
            dataCy="add-book-copy-overlay"
            onAccentButtonAction={handleAcceptAddBookCopy}
            onButtonAction={() => setShowModal(false)}
            modalName='modal'
            title="Do you want to add a new copy of the book?"
            buttonLabel="No"
            accentButtonLabel="Yes"
          />
        )
      }
          
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
              data-cy="modal-qr-form-close-button"
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

          <div className='modal-qr-form__buttons-container'>
            <Button
              data-cy='add-copy-button' 
              className='modal-qr-form__add-copy-button'
              onClick={() => setShowModal(true)}
              label={
                <>
                  {isSaving ? (
                    <>Adding Copy</>
                  ) : (
                    <>
                      <PlusIcon /> Add Copy
                    </>
                  )}
                </>
              }
              isAccent
              isDisable={isSaving}
              isLoader={isSaving}
            />
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
    </>
  )
})