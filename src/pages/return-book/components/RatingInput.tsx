import './RatingInput.scss'

import { useState } from 'react'

import Star from '../../../assets/icons/Star.svg?react'

export const RatingInput = ({
  value, 
  onChange,  
  error,
  disabled = false,
}: {
  value: number,
  onChange: (value: number) => void,
  error?: boolean,
   disabled?: boolean,
}) => {
  const [
    hover,
    setHover,
  ] = useState<number>(0)

  const numberOfStars = Array.from({
    length: 5, 
  }, (_, i) => i + 1)

  return (
    <div
      className={`rating ${error ? `error` : ``} ${disabled ? `rating--disabled` : ``}`}
      onMouseLeave={() => setHover(0)}
    >
      {numberOfStars.map((star) => {
        const isActive = (hover || value) >= star

        return (
          <Star
            key={star}
            className={`rating__star ${isActive ? `rating__star--active` : ``}`}
            onMouseEnter={() => {
              if (!disabled) setHover(star)
            }}
            onClick={() => {
              if (!disabled) onChange(star)
            }}
          />
        )
      })}
    </div>
  )
}