import './Button.scss'

import clsx from 'clsx'

export const Button = ({
  onClick,
  className, 
  label, 
  isAccent,
  isDisable = false,
  isLoader = false,
  isMobile = false,
  isOutline = false,
}: {
  onClick: () => unknown,
  className?: string, 
  label: string | React.ReactNode, 
  isAccent?: boolean,
  isDisable?: boolean,
  isLoader?: boolean,
  isMobile?: boolean,
  isOutline?: boolean,
}) => (
  <button 
    type="button"
    onClick={onClick} 
    className={clsx(`button`, className, {
      'button__accent': isAccent === true,
      'button__secondary': isAccent === false,
      'button__disable': isDisable,
      'button__mobile': isMobile,
      'button__outline': isOutline,
    })}
    disabled={isDisable}
  >
    {
      <>
        {
          isLoader && <span className="button__loader" />
        }
        {label}
      </>
    }
  </button>
)
