import { useEffect, useState } from "react"

export const useCopyIdValidation = ({
  copyId, 
  bookCopiesIds,
}: {
  copyId?: string, 
  bookCopiesIds: BookType['bookCopiesIds'],
}) => {
  const [
    isValidCopyId,
    setIsValidCopyId,
  ] = useState(false)

  useEffect(() => {
    // if copyId isn't passed or is not a number or is not in bookCopies
    if (!copyId || isNaN(Number(copyId)) || !bookCopiesIds.includes(Number(copyId))) {
      return
    }

    setIsValidCopyId(true)
  }, [
    copyId,
    bookCopiesIds,
  ])

  return isValidCopyId
}
