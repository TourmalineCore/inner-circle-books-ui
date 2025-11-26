import './ModalQRCard.scss'

import CheckboxOnIcon from '../../../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../../../assets/icons/Checkbox-off.svg?react'

import QRCode from "react-qr-code"
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import clsx from 'clsx'
import { LINK_TO_BOOKS_SERVICE } from '../../../../../../common/config/config'
import { ModalQrFormStateContext } from '../../state/ModalQrFormStateContext'

export const ModalQRCard = observer(({
  title,
  bookCopyId,
  secretKey,
}: {
  title: string,
  bookCopyId: number,
  secretKey: string,
}) => {
  const modalQrFormState = useContext(ModalQrFormStateContext)
  
  return modalQrFormState.bookCopiesCount > 1 
    ? (
      <button
        type="button"
        key={bookCopyId}
        className={clsx(`modal-qr-card`, { 
          'modal-qr-card--selected': modalQrFormState.isBookCopySelected({
            id: bookCopyId, 
          }),
        })}
        onClick={() => modalQrFormState.toggleBookCopyChecked({
          id: bookCopyId,
        })}
      >
        <div className="modal-qr-card__checkbox-icon">
          {
            modalQrFormState.isBookCopySelected({
              id: bookCopyId,
            }) 
              ? <CheckboxOnIcon /> 
              : <CheckboxOffIcon />
          }
        </div>

        <div className="modal-qr-card__content">

          <div className='modal-qr-card__info'>
            <div className="modal-qr-card__copy-text">
              Copy ID: {bookCopyId}
            </div>

            <div className="modal-qr-card__title">
              {title}
            </div>
          </div>

          <div className="modal-qr-card__qr">
            <QRCode
              size={64}
              value={`${window.location.origin.startsWith(`https`)
                ? `https://ic.tourmalinecore.com`
                : window.location.origin}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}&s=${secretKey}`}
              viewBox={`0 0 64 64`}
            />
          </div>
        </div>
      </button>
    )
    : (
      <div className="modal-qr-card-without-checkbox">
        <div className="modal-qr-card-without-checkbox__content">
          <div className='modal-qr-card__info'>
            <div className="modal-qr-card-without-checkbox__copy-text">
              Copy ID: {bookCopyId}
            </div>
            <div className="modal-qr-card-without-checkbox__title">
              {title}
            </div>
          </div>

          <div className="modal-qr-card-without-checkbox__qr">
            <QRCode
              size={64}
              value={`${window.location.origin.startsWith(`https`)
                ? `https://ic.tourmalinecore.com`
                : window.location.origin}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}&s=${secretKey}`}
              viewBox={`0 0 64 64`}
            />
          </div>
        </div>
      </div>
    )
})