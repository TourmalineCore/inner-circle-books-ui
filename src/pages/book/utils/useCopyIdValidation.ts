import { useEffect, useState } from "react"

export const useCopyIdValidation = ({
  copyId, 
  bookCopies,
}: {
  copyId?: string, 
  bookCopies: BookCopyType[],
}) => {
  const [
    isValidCopyId,
    setIsValidCopyId,
  ] = useState(false)

  useEffect(() => {
    // if copyId isn't passed or is not a number or is not in bookCopies
    if (!copyId || isNaN(Number(copyId)) || !bookCopies.some(({
      bookCopyId, 
    }) => bookCopyId === Number(copyId))) {
      return
    }

    setIsValidCopyId(true)
  }, [
    copyId,
    bookCopies,
  ])

  return isValidCopyId
}
