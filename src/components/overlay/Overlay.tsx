import './Overlay.scss'

import { ModalWindow } from '../modal-window/ModalWindow'
import { ModalQRForm } from '../../pages/book/components/modal-qr-form/ModalQRForm'
import { useEffect } from 'react'
import { ModalCalendar } from '../../pages/book/components/modal-calendar/ModalCalendar'

export const Overlay = ({
  onClick,
  onCloseModal,
  modalName,
  title,
  text,
  buttonLabel,
  accentButtonLabel,
  hasCloseButton = false,
}: {
  onClick: () => unknown,
  onCloseModal: () => unknown,
  modalName: string,
  title?: string,
  text?: string | React.ReactNode,
  buttonLabel?: string,
  accentButtonLabel?: string,
  hasCloseButton?: boolean,
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
            onQuit={onClick}
            onCloseModal={onCloseModal}
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
            onPrint={onClick}
            onCloseModal={onCloseModal}
          />
        )
      }

      {
        modalName == `modalCalendar` && (
          <ModalCalendar
            // onSelect={onClick}
            // onReturn={onClick}
            onPrint={() => {}}
            onCloseModal={onCloseModal}
          />
        )
      }
    </div>
  )
}
