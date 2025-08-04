import './ModalQRCard.scss'

import CheckboxOnIcon from '../../../../../../assets/icons/Checkbox-on.svg?react'
import CheckboxOffIcon from '../../../../../../assets/icons/Checkbox-off.svg?react'

import { API_ROOT } from '../../../../../../common/config/config'
import { LINK_TO_BOOKS_SERVICE } from '../../../../../../common/config/config'
import QRCode from "react-qr-code"
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { BookStateContext } from '../../../../state/BookStateStateContext'
import clsx from 'clsx'

export const ModalQRCard = observer(({
  index,
  title,
  bookId,
  bookCopyId,
}: {
  index: number,
  title: string,
  bookId: number,
  bookCopyId: number,
}) => {
  const bookState = useContext(BookStateContext)
  
  return bookState.count > 1 
    ? (
      <button
        type="button"
        key={index}
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
              Copy {index}
            </div>

            <div className="modal-qr-card__qr">
              <QRCode
                size={64}
                value={`${API_ROOT}${LINK_TO_BOOKS_SERVICE}/${bookId}?bookCopyId=${bookCopyId}`}
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
              Copy {index}
            </div>

            <div className="modal-qr-card-without-checkbox__qr">
              <QRCode
                size={64}
                value={`${API_ROOT}${LINK_TO_BOOKS_SERVICE}/${bookId}?bookCopyId=${bookCopyId}`}
                viewBox={`0 0 64 64`}
              />
            </div>
          </div>
        </div>
      </div>
    )
})