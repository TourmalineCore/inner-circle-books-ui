import './CounterInput.scss'

import PlusIcon from '../../../../assets/icons/Plus.svg?react'
import MinusIcon from '../../../../assets/icons/Minus.svg?react'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

export const MIN_VALUE: number = 1
export const MAX_VALUE: number = 99

export const CounterInput = ({
  label,
  value,
  onChange,
}: {
  label: string,
  value: number,
  onChange: (val: number) => unknown,
}) => {
  const [
    inputValue,
    setInputValue,
  ] = useState(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [
    value,
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    
    // Allow empty input or digits only, but limit to two digits
    if (val === `` || (/^\d{0,2}$/.test(val))) {
      setInputValue(val)
    }
  }

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10)
    
    if (!isNaN(parsed)) {
      onChange(Math.max(MIN_VALUE, Math.min(parsed, MAX_VALUE)))
    }
    else {
      setInputValue(MIN_VALUE.toString())
      onChange(MIN_VALUE)
    }
  }

  const isMinusDisabled = inputValue === MIN_VALUE.toString()
  const isPlusDisabled = inputValue === MAX_VALUE.toString()

  return (
    <div className="counter-input">
      <span className="counter-input__label">
        {label}
      </span>

      <div className="counter-input__controls">
        <button
          type="button"
          className={clsx(`counter-input__button`, { 
            'counter-input__button--disabled': isMinusDisabled,
          })}
          data-cy="counter-input-button-minus"
          onClick={() => onChange(Math.max(MIN_VALUE, value - 1))}
          disabled={isMinusDisabled}
        >
          <MinusIcon />
        </button>

        <input
          className="counter-input__value"
          data-cy="counter-input-value"
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        
        <button
          type="button"
          className={clsx(`counter-input__button`, { 
            'counter-input__button--disabled': isPlusDisabled,
          })}
          data-cy="counter-input-button-plus"
          onClick={() => onChange(value + 1)}
          disabled={isPlusDisabled}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
