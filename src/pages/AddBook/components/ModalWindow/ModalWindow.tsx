import './ModalWindow.scss'

import { Button } from '../Button/Button'

export const ModalWindow = ({
  onQuit,
  onCloseModal,
}: {
  onQuit: () => unknown,
  onCloseModal: () => unknown,
}) => (
  <div className="modal-window">
    <div className="modal-window__title">
      Do You Want to Quit this Page?
    </div>

    <div className="modal-window__text">
      The data you have entered will not be saved
    </div>

    <div className="modal-window__actions"> 
      <Button 
        onClick={onCloseModal}
        label="No, Stay Here"
      />
    
      <Button 
        onClick={onQuit}
        label="Yes, Quit"
        isAccent
      />
    </div>
  </div>
)
