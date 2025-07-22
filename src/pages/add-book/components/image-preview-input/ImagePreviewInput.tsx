import './ImagePreviewInput.scss'

import NoImage from "../../../../assets/img/no-image.png"

import clsx from 'clsx'
import { useImageValid } from '../../../../common/useImageValid'

export const ImagePreviewInput = ({
  label, 
  url, 
  onChange, 
}: {
  label: string,
  url: string,
  onChange: ({
    value,
  }: {
    value: string,
  }) => unknown,
}) => {
  const isValidUrl = useImageValid(url)

  return (
    <label className="image-preview-input">
      <div className="image-preview-input__body">
        <span className="image-preview-input__label">
          {label}
        </span>

        <input
          type="text"
          className="image-preview-input__input"
          placeholder="Enter the URL to the book cover"
          value={url}
          onChange={(e) => onChange({
            value: e.target.value,
          })}
        />
      </div>

      <img
        src={isValidUrl 
          ? url 
          : NoImage
        }
        alt="Preview"
        className={clsx(`image-preview-input__preview`, { 
          'image-preview-input__preview--no-image': !isValidUrl,
        })}
      />
    </label>
  )
}
