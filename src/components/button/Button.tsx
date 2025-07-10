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
}: {
  onClick: () => unknown,
  className?: string, 
  label: string | React.ReactNode, 
  isAccent?: boolean,
  isDisable?: boolean,
  isLoader?: boolean,
  isMobile?: boolean,
}) => (
  <button 
    type="button"
    onClick={onClick} 
    className={clsx(`button`, className, {
      [isAccent 
        ? `button__accent` 
        : `button__secondary`
      ]: true,
      'button__disable': isDisable,
      'button__mobile': isMobile,
    })}
    disabled={isDisable}
  >
    {
      <>
        {isLoader && <span className="button__loader"></span>}
        {label}
      </>
    }
  </button>
)
