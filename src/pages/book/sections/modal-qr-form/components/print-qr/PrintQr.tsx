import './PrintQr.scss'

import LogoIcon from '../../../../../../assets/img/logo-qr.png'

import QRCode from "react-qr-code"
import { LINK_TO_BOOKS_SERVICE } from "../../../../../../common/config/config"
import moment from 'moment'

export function PrintQr({
  title,
  bookCopyId,
  secretKey,
  timestamp = moment(),
}: {
  title: string,
  bookCopyId: number,
  secretKey: string,
  timestamp?: moment.Moment,
}) {
  return (
    <div 
      className="print-qr"
      data-cy='print-qr'
    > 
      <img 
        className='print-qr__logo'
        src={LogoIcon}
        width={48}
        height={16}
      />
      <div className="print-qr__wrapper">
        <div className='print-qr__info'>
          <div className="print-qr__meta">
            {timestamp.format(`YYYY-MM-DD HH:mm`)}
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
            value={`${window.location.origin.startsWith(`https`)
              ? `http://ic.tourmalinecore.com`
              : window.location.origin}${LINK_TO_BOOKS_SERVICE}?c=${bookCopyId}&s=${secretKey}`}
            viewBox={`0 0 84 84`}
          />
        </div>
      </div>
      <span className='print-qr__secret'>
        {secretKey}
      </span>
    </div>
  )
}