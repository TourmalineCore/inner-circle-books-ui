import './PrintQr.scss'

import QRCode from "react-qr-code"
import { LINK_TO_BOOKS_SERVICE, VITE_BASE_URL } from "../../../../../../common/config/config"
import moment from 'moment'

export function PrintQr({
  title,
  bookCopyId,
  timestamp = moment(),
}: {
  title: string,
  bookCopyId: number,
  timestamp?: moment.Moment,
}) {
  return (
    <div 
      className="print-qr"
      data-cy='print-qr'
    > 
      <div 
        className="print-qr__wrapper"
      >
        <div className='print-qr__info'>
          <div className="print-qr__meta">
            {timestamp.format(`DD.MM.YYYY HH:mm`)}
            {` `}
            Id: {bookCopyId} 
          </div>
          <div className="print-qr__title">
            {title}
          </div>
        </div>
        <div className="print-qr__code">
          <QRCode
            size={84}
            value={`${VITE_BASE_URL}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}`}
            viewBox={`0 0 84 84`}
          />
        </div>
      </div>
    </div>
  )
}