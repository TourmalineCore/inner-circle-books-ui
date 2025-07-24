import { observer } from "mobx-react-lite"
import { ScanStateContext } from "./state/ScanStateContext"
import { useContext, useEffect } from "react"
import { CameraScanner } from "./components/CameraScanner"

export const ScanContainer = observer(() => {
  const scanState = useContext(ScanStateContext)

  useEffect(() => {
    scanState.getInfoScan(null)
  }, [])

  return (
    <CameraScanner
      getInfoScanLoad={getInfoScanLoad}
      scanUrlState={scanState}
    />

  )
  async function getInfoScanLoad(results: string) {
    if (results) {
      window.location.href =(`${results}`)
    }
  }
})
