import './BookActionButton.scss'

import InfoIcon from "../../../../assets/icons/Info.svg?react"

import { returnBookRoutes } from '../../../routes'
import { getEmployeeIdFromToken } from '../../../../common/tokenUtils'
import { Button } from '../../../../components/button/Button'

export const BookActionButton = ({
  copyId,
  employeesWhoReadNow,
  setShowModal,
  isValidCopyId,
}: {
  copyId?: string,
  employeesWhoReadNow: EmployeeWhoReadNowType[],
  isValidCopyId: boolean,
  setShowModal: (value: boolean) => void,
}) => {
  const isCurrentUserReadingThisCopy = employeesWhoReadNow.some(
    (reader) => reader.employeeId === getEmployeeIdFromToken() && reader.bookCopyId === Number(copyId),
  )

  const currentReader = employeesWhoReadNow.find((reader) => reader.bookCopyId === Number(copyId))

  const isBookCopyBusy = !isCurrentUserReadingThisCopy && employeesWhoReadNow.some(({
    bookCopyId,
  }) => bookCopyId === Number(copyId))
  
  return (
    <div className='book-action-button'>
      {
        isValidCopyId && !isBookCopyBusy
          ? (
            <Button
              onClick={() => {
                isCurrentUserReadingThisCopy
                  ? window.location.href = `${returnBookRoutes[0].path.replace(`:id`, String(copyId))}`
                  : setShowModal(true)
              }}
              label={
                isCurrentUserReadingThisCopy
                  ? `Return Book`
                  : `Take Book`
              }
              className='book-action-button__button'
              isAccent
            />
          ) 
          : (
            <div className="book-action-button__take-info">
              <InfoIcon />
              <p className="book-action-button__take-info-text">
                {
                  copyId 
                    ? isBookCopyBusy
                      ? `${currentReader?.fullName} has already taken this book`
                      : `Copy of book does not exist, check the correctness of the QR code` 
                    : `You can take book after scanning the QR code on book cover`
                }
              </p>
            </div>
          )
      }
    </div>
  )
}
