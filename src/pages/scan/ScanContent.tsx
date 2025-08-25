import './ScanContent.scss'

import Scan from "../../assets/img/scan-qr.svg"

import { observer } from "mobx-react-lite"
import { useZxing } from './utils/useZxing'

export const ScanContent = observer(({
  onUrlDetected,
}: {
  onUrlDetected: ({
    url, 
  }: { 
    url: string, 
  }) => unknown,
}) => {
  const {
    ref, 
  } = useZxing({
    onResult(result) {
      onUrlDetected({
        url: result.getText(),
      })
    },
  })

  return (
    <div className='scan'>
      <img
        className="scan__image"
        data-cy='scan-image'
        src= {Scan}
        alt="Point the QR code from the book at your computer's camera"
      />
      <video
        className="scan__video"
        data-cy='scan-video'
        ref={ref}
      />
    </div>
  )
})
