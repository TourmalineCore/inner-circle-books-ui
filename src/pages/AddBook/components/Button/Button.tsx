import './Button.scss'

import clsx from 'clsx'

export const Button = ({
  onClick,
  className, 
  label, 
  isAccent,
}: {
  onClick: () => unknown,
  className?: string, 
  label: string, 
  isAccent?: boolean,
}) => (
  <button 
    type="button"
    onClick={onClick} 
    className={clsx(`button`, className, {
      'button__accent': isAccent,
    })}
  >
    {label}
  </button>
)
