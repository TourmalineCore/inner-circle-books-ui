import './CounterInput.scss'

import PlusIcon from '../../../../assets/icons/Plus.svg?react'
import MinusIcon from '../../../../assets/icons/Minus.svg?react'

import { useState, useEffect } from 'react'

export const CounterInput = ({
  label,
  value,
  onChange,
  min = 1,
}: {
  label: string,
  value: number,
  onChange: (val: number) => void,
  min?: number,
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
    
    if (val === `` || /^\d+$/.test(val)) {
      setInputValue(val)
    }
  }

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10)
    
    if (!isNaN(parsed)) {
      onChange(Math.max(min, parsed))
    }
    else {
      setInputValue(min.toString())
      onChange(min)
    }
  }

  return (
    <div className="counter-input">
      <span className="counter-input__label">
        {label}
      </span>

      <div className="counter-input__controls">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="counter-input__button"
        >
          <MinusIcon />
        </button>

        <input
          className="counter-input__value"
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        
        <button
          type="button"
          className="counter-input__button"
          onClick={() => onChange(value + 1)}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
