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

const MOCK_BOOK = {
  id: 1,
  title: `ChatGPT мастер подсказок или как создавать сильные промты  для нейросети`,
  annotation: `annotation`,
  language: `ru`,
  authors: [
    {
      fullName: `authors`, 
    },
  ],
  bookCoverUrl: ``,
  bookCopies: [
    {
      bookCopyId: 11,
    },
    {
      bookCopyId: 12,
    },
    {
      bookCopyId: 13,
    },
    {
      bookCopyId: 14,
    },
    {
      bookCopyId: 15,
    },
  ],
}

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
      <div className='modal-qr-form__content'>
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

        <div className="modal-qr-form__cards">
          {
            MOCK_BOOK.bookCopies.map(({
              bookCopyId,
            }, index) => (
              <ModalQRCard
                index={index + 1}
                title={MOCK_BOOK.title}
                bookId={MOCK_BOOK.id}
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