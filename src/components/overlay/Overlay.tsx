import './Overlay.scss'

import { ModalWindow } from '../../pages/add-book/components/modal-window/ModalWindow'
import { ModalQRForm } from '../../pages/book/components/modal-qr-form/ModalQRForm'
import { useEffect } from 'react'

export const Overlay = ({
  onQuit,
  onPrint,
  onCloseModal,
}: {
  onQuit?: () => unknown,
  onPrint?: () => unknown,
  onCloseModal: () => unknown,
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
        onQuit && (
          <ModalWindow 
            onQuit={onQuit}
            onCloseModal={onCloseModal}
          />
        )
      }
      {
        onPrint && (
          <ModalQRForm
            onPrint={onPrint}
            onCloseModal={onCloseModal}
          />
        )
      }
    </div>
  )
}
