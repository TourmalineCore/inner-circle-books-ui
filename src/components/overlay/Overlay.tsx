import './Overlay.scss'

import { ModalWindow } from '../modal-window/ModalWindow'
import { ModalQRForm } from '../../pages/book/components/modal-qr-form/ModalQRForm'
import { useEffect } from 'react'
import { ModalCalendar } from '../../pages/book/components/modal-calendar/ModalCalendar'

export const Overlay = ({
  onAccentButtonAction,
  onButtonAction,
  onCloseModal,
  modalName,
  title,
  text,
  buttonLabel,
  accentButtonLabel,
  hasCloseButton = false,
  endCalendarDate,
  onChangeCalendar,
}: {
  onAccentButtonAction: () => unknown,
  onButtonAction?: () => unknown,
  onCloseModal?: () => unknown,
  modalName: `modal` | `modalQRForm` | `modalCalendar`,
  title?: string,
  text?: string | React.ReactNode,
  buttonLabel?: string,
  accentButtonLabel?: string,
  hasCloseButton?: boolean,
  endCalendarDate?: Date | null,
  onChangeCalendar?: (dates: [Date, Date]) => unknown,
}) => {

  useEffect(() => {
    // Add class to body when overlay is opened for add style to disable scroll under overlay
    document
      .body
      .classList
      .add(`overlay-open`)

    // Remove class from body when component unmounts
    return () => {
      document
        .body
        .classList
        .remove(`overlay-open`)
    }
  }, [])

  return (
    <div className="overlay">
      {
        modalName == `modal` && (
          <ModalWindow 
            onAccentButtonAction={onAccentButtonAction}
            onButtonAction={onButtonAction!}
            onCloseModal={onCloseModal!}
            title={title!}
            text={text!}
            buttonLabel={buttonLabel!}
            accentButtonLabel={accentButtonLabel!}
            hasCloseButton={hasCloseButton} 
          />
        )
      }

      {
        modalName == `modalQRForm` && (
          <ModalQRForm
            onCloseModal={onCloseModal!}
          />
        )
      }

      {
        modalName == `modalCalendar` && (
          <ModalCalendar
            onAccentButtonAction={onAccentButtonAction}
            onButtonAction={onButtonAction!}
            onCloseModal={onCloseModal!}
            endCalendarDate={endCalendarDate!}
            onChangeCalendar={onChangeCalendar!}
          />
        )
      }
    </div>
  )
}
