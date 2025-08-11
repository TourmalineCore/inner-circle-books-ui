import './ModalCalendar.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'

import { Button } from '../../../../components/button/Button'
import { useContext, useState } from 'react'
import { BookStateContext } from '../../state/BookStateStateContext'
import { observer } from 'mobx-react-lite'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import { CustomCalendar } from './custom-calendar/CustomCalendar'

export const ModalCalendar = observer(({
  onPrint,
  onCloseModal,
}: {
  onPrint: () => unknown,
  onCloseModal: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)

  const isMobile = useMediaQuery({
    maxWidth: 767,
  })

  const [
    isClosing,
    setIsClosing,
  ] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    bookState.resetSelectedCopies()

    if (isMobile) {
      setTimeout(onCloseModal, 400) // Close after end of animation
    }
    else {
      onCloseModal()
    }
  }

  return (
    <div 
      className={clsx(`modal-calendar`, {
        'modal-calendar--closing': isClosing,
      })}
      data-cy="modal-calendar"
    >
      <button
        type="button"
        className="modal-calendar__close-button"
        onClick={handleClose}
      >
        <CancelIcon />
      </button>
      
      <div className="modal-calendar__title">
          Choose the Date When you are Going to Return this Book
      </div>

      <CustomCalendar />

      <div className="modal-calendar__actions"> 
        <Button 
          onClick={() => {}}
          label="Back"
        />
    
        <Button 
          onClick={() => onPrint}
          label="Take Book"
          className='modal-calendar__accent-button'
          isAccent
        />
      </div>
    </div>
  )
})