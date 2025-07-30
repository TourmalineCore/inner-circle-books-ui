import './ScanContent.scss'

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
    <div
      className='scan'
      data-cy='scan'
    >
      <button
        autoFocus
        type="button"
        className="scan__hidden-button"
      />

      <div className="scan__instruction">
        Чтобы отсканировать штрихкод, наведите на него камеру
      </div>

      <video
        className="scan__video"
        data-cy='scan-video'
        ref={ref}
      />
    </div>
  )
})
