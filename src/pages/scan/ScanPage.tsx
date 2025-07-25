import { useMemo } from "react"
import { ScanContainer } from "./ScanContainer"
import { ScanStateContext } from "./state/ScanStateContext"
import { ScanState } from "./state/ScanState"

export function ScanPage() {
  const scanState = useMemo(
    () => new ScanState(),
    [],
  )

  return (
    <ScanStateContext.Provider value={scanState}>
      <ScanContainer data-cy="scan"/>
    </ScanStateContext.Provider>
  )
}
