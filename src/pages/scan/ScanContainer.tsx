import { observer } from "mobx-react-lite"
import { ScanStateContext } from "./state/ScanStateContext"
import { useContext, useEffect } from "react"
import { ScanContent } from "./ScanContent"

export const ScanContainer = observer(() => {
  const scanState = useContext(ScanStateContext)

  useEffect(() => {
    scanState.resetScanUrl()
  }, [])

  return (
    <ScanContent 
      data-cy="scan"
      onUrlDetected={navigateToDetectedUrl} 
    />
  )
})

async function navigateToDetectedUrl({
  url,
}: {
    url: string,
  }) {
  if (url) {
    window.location.href = url
  }
}
