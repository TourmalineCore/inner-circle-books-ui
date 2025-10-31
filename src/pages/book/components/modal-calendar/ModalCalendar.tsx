import './ModalCalendar.scss'

import CancelIcon from '../../../../assets/icons/Сancel.svg?react'

import { Button } from '../../../../components/button/Button'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMediaQuery } from 'react-responsive'
import clsx from 'clsx'
import { CustomCalendar } from './custom-calendar/CustomCalendar'

export const ModalCalendar = observer(({
  onAccentButtonAction,
  onButtonAction,
  onCloseModal,
  endCalendarDate,
  onChangeCalendar,
}: {
  onAccentButtonAction: () => unknown,
  onButtonAction: () => unknown,
  onCloseModal: () => unknown,
  endCalendarDate: Date | null,
  onChangeCalendar: (dates: [Date, Date]) => unknown,
}) => {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  })

  const [
    isClosing,
    setIsClosing,
  ] = useState(false)

  const handleClose = () => {
    setIsClosing(true)

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

      <CustomCalendar   
        endCalendarDate={endCalendarDate}
        onChangeCalendar={onChangeCalendar}
      />

      <div className="modal-calendar__actions"> 
        <Button 
          onClick={onButtonAction}
          label="Back"
        />
    
        <Button 
          onClick={onAccentButtonAction}
          label="Take Book"
          className='modal-calendar__accent-button'
          isAccent
        />
      </div>
    </div>
  )
})