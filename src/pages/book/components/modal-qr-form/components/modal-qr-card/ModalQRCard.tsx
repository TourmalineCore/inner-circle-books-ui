import './ModalQRCard.scss'

import CheckboxOnIcon from '../../../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../../../assets/icons/Checkbox-off.svg?react'

import QRCode from "react-qr-code"
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { BookStateContext } from '../../../../state/BookStateStateContext'
import clsx from 'clsx'
import {LINK_TO_BOOKS_SERVICE, VITE_BASE_URL } from '../../../../../../common/config/config'

export const ModalQRCard = observer(({
  copyNumber,
  title,
  bookCopyId,
}: {
  copyNumber: number,
  title: string,
  bookCopyId: number,
}) => {
  const bookState = useContext(BookStateContext)
  
  return bookState.count > 1 
    ? (
      <button
        type="button"
        key={copyNumber}
        className={clsx(`modal-qr-card`, { 
          'modal-qr-card--selected': bookState.isBookCopySelected({
            id: bookCopyId, 
          }),
        })}
        onClick={() => bookState.toggleBookCopyChecked({
          id: bookCopyId,
        })}
      >
        <div
          className="modal-qr-card__checkbox-icon"
        >
          {
            bookState.isBookCopySelected({
              id: bookCopyId,
            }) 
              ? <CheckboxOnIcon /> 
              : <CheckboxOffIcon />
          }
        </div>

        <div className="modal-qr-card__content">
          <div className="modal-qr-card__title">
            {title}
          </div>

          <div className="modal-qr-card__qr-container">
            <div className="modal-qr-card__copy-text">
              Copy {copyNumber}
            </div>

            <div className="modal-qr-card__qr">
              <QRCode
                size={64}
                value={`${VITE_BASE_URL}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}`}
                viewBox={`0 0 64 64`}
              />
            </div>
          </div>
        </div>
      </button>
    )
    : (
      <div className="modal-qr-card-without-checkbox">
        <div className="modal-qr-card-without-checkbox__content">
          <div className="modal-qr-card-without-checkbox__title">
            {title}
          </div>

          <div className="modal-qr-card-without-checkbox__qr-container">
            <div className="modal-qr-card-without-checkbox__copy-text">
              Copy {copyNumber}
            </div>

            <div className="modal-qr-card-without-checkbox__qr">
              <QRCode
                size={64}
                value={`${VITE_BASE_URL}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}`}
                viewBox={`0 0 64 64`}
              />
            </div>
          </div>
        </div>
      </div>
    )
})