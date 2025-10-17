import './PrintQr.scss'

import QRCode from "react-qr-code"
import { LINK_TO_BOOKS_SERVICE, VITE_BASE_URL } from "../../../../../../../../common/config/config"
import moment from 'moment'

export function PrintQr({
  title,
  copyNumber,
  bookCopyId,
}: {
  copyNumber: number,
  title: string,
  bookCopyId: number,
}) {
  return (
    <div 
      className="print-qr"
    >
      <div 
        className="print-qr__wrapper"
      >
        <div className='print-qr__info'>
          <div className="print-qr__copy-text">
            {
              moment()
                .format(`DD.MM.YY`)
            }
            {` `}
            Copy {copyNumber} 
          </div>
          <div className="print-qr__title">
            {title}
          </div>
        </div>

        <div className="print-qr__code">
          <QRCode
            size={74}
            value={`${VITE_BASE_URL}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}`}
            viewBox={`0 0 74 74`}
          />
        </div>
      </div>
    </div>
  )
}