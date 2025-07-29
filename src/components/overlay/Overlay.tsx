import './Overlay.scss'

import { ModalWindow } from '../../pages/add-book/components/modal-window/ModalWindow'
import { ModalQRForm } from '../../pages/book/components/modal-qr-form/ModalQRForm'

export const Overlay = ({
  onQuit,
  onPrint,
  onCloseModal,
}: {
  onQuit?: () => unknown,
  onPrint?: () => unknown,
  onCloseModal: () => unknown,
}) => (
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
