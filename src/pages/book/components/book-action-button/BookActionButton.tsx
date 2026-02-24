import './BookActionButton.scss'

import ScanIcon from '../../../../assets/icons/Scan.svg?react'

import { returnBookRoutes, scanRoutes } from '../../../routes'
import { getEmployeeIdFromToken } from '../../../../common/tokenUtils'
import { Button } from '../../../../components/button/Button'
import { useSearchParams } from 'react-router-dom'

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

  const [
    searchParams,
  ] = useSearchParams()
    
  const secretKey = searchParams.get(`s`)

  return (
    <div className='book-action-button'>
      { 
        isValidCopyId 
          ? (
            <Button
              onClick={() => {
                isCurrentUserReadingThisCopy
                  ? window.location.href = `${returnBookRoutes[0].path.replace(`:id`, String(copyId))}?s=${secretKey}`
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
              {
                !copyId && (
                  <Button
                    className="book-action-button__scan-button"
                    onClick={() => window.location.href = scanRoutes[0].path}
                    label={
                      <>
                        <ScanIcon /> Scan QR
                      </>
                    }
                    isAccent
                  />
              )}
              <p className="book-action-button__take-info-text">
                {
                  copyId 
                    ? `Copy of book does not exist, check the correctness of the QR code` 
                    : `You can take book after scanning the QR code on book cover`
                }
              </p>
              
            </div>
          )}
    </div>
  )
}
