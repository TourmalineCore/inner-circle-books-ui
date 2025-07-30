import { BrowserMultiFormatReader, DecodeHintType } from "@zxing/library"
import { useMemo } from "react"

const DEFAULT_TIME_BETWEEN_DECODING_ATTEMPTS = 300

export const useBrowserMultiFormatReader = ({
  hints,
  timeBetweenDecodingAttempts = DEFAULT_TIME_BETWEEN_DECODING_ATTEMPTS,
}: {
  hints?: Map<DecodeHintType, any>,
  timeBetweenDecodingAttempts?: number,
} = {}) => useMemo<BrowserMultiFormatReader>(() => {
  const instance = new BrowserMultiFormatReader(hints)

  instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts

  return instance
}, [
  hints,
  timeBetweenDecodingAttempts,
])
