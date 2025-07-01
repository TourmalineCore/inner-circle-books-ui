import './ImagePreviewInput.scss'

import NoImage from "../../../../assets/img/no-image.png"

export const ImagePreviewInput = ({
  label, 
  url, 
  onChange, 
}: {
  label: string,
  url: string,
  onChange: (value: string) => void,
}) => (
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
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    {
      url 
        ? <img
          src={url}
          alt="Preview"
          className="image-preview-input__preview"
          onError={(e) => (e.currentTarget.style.display = `none`)}
        />
        : <img
          src={NoImage}
          alt="Preview"
          className="image-preview-input__preview"
          onError={(e) => (e.currentTarget.style.display = `none`)}
        />
    }
  </label>
)
