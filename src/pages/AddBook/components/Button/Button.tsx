import './Button.scss'

import clsx from 'clsx'

export const Button = ({
  onClick,
  className, 
  label, 
  isAccent,
  isDisable = false,
  isLoader = false,
}: {
  onClick: () => unknown,
  className?: string, 
  label: string, 
  isAccent?: boolean,
  isDisable?: boolean,
  isLoader?: boolean,
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
