import './Overlay.scss'

import { ModalWindow } from '../modal-window/ModalWindow'

export const Overlay = ({
  onQuit,
  onCloseModal,
}: {
  onQuit: () => unknown,
  onCloseModal: () => unknown,
}) => (
  <div className="overlay">
    <ModalWindow 
      onQuit={onQuit}
      onCloseModal={onCloseModal}
    />
  </div>
)
