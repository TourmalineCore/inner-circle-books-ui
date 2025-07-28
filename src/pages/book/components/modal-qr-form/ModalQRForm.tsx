import './ModalQRForm.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'
import PrintIcon from '../../../../assets/icons/Print.svg?react'
import CheckboxOnIcon from '../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../assets/icons/Checkbox-off.svg?react'

import { Button } from '../../../../components/button/Button'
import { ModalQRCard } from './components/modal-qr-card/ModalQRCard'
import { useContext } from 'react'
import { BookStateContext } from '../../state/BookStateStateContext'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

export const ModalQRForm = observer(({
  onPrint,
  onCloseModal,
}: {
  onPrint: () => unknown,
  onCloseModal: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)

  return (
    <div 
      className="modal-qr-form"
      data-cy="modal-qr-form"
    >
      <div className={clsx('modal-qr-form__content', {
          'modal-qr-form__content--has-single-item': bookState.count === 1,
      })}>
        <button
          type="button"
          className="modal-qr-form__close-button"
          onClick={onCloseModal}
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

      <div className={clsx('modal-qr-form__cards', {
          'modal-qr-form__cards--has-single-item': bookState.count === 1,
      })}>
          {
            bookState.book.bookCopies.map(({
              bookCopyId,
            }, index) => (
              <ModalQRCard
                index={index + 1}
                title={bookState.book.title}
                bookId={bookState.book.id}
                bookCopyId={bookCopyId}
              />
            ))
          }
        </div>
      </div>

      <div className='modal-qr-form__print-button-container'>
        <Button 
          onClick={onPrint}
          className='modal-qr-form__print-button'
          label={
            <>
              <PrintIcon /> Print
            </>
          }
          isAccent
        />
      </div>
    </div>
  )
})