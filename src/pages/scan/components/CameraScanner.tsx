/* eslint-disable @typescript-eslint/no-shadow */
import { observer } from 'mobx-react-lite'
import { useZxing } from './useZxing'

type CameraScannerProps = {
  getInfoScanLoad: (scan: string) => void,
  scanUrlState: any,
}

export const CameraScanner = observer((
  {
    getInfoScanLoad, 
  }: CameraScannerProps) => {

  const {
    ref, 
  } = useZxing({
    onResult(result) {
      getInfoScanLoad(result.getText())
    },
  })

  return (
    <>
      <button
        autoFocus
        type="button"
        className="scan__hidden-button"
      />
      <div className="scan__manual-input-block">
        <div className="scan__describe">
          Чтобы отсканировать штрихкод, наведите на него камеру
        </div>
      </div>
      <video
        className="scan__video"
        ref={ref}
        style={{
          display: `block`,
          width: `100%`,
        }}
      />
    </>
  )
})
