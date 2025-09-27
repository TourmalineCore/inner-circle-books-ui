import './ReturnBookContent.scss'

import NoImage from "../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useImageValid } from '../../common/useImageValid'

export const ReturnBookContent = observer(({
  title,
  coverUrl,
  onSubmit,
}:{
  title: string,
  coverUrl: string,
  onSubmit: ({
    bookCopyId, 
    progressOfReading, 
  }: ReturnBookType,
  ) => unknown,
}) => {
  const isValidUrl = useImageValid(coverUrl)

  return (
    <form 
      className="return-book"
      data-cy="return-book"
    >
      <div className="return-book__info">
        <img
          className="return-book__image"
          data-cy="return-book-image"
          src={isValidUrl 
            ? coverUrl 
            : NoImage
          }
          alt={title}
        />
        <div className="return-book__title">
          {title}
        </div>
      </div>
      
      <div className="return-book__feedback">
        <label className="return-book__label">
          Specify your reading progress*
        </label>
        <div className="return-book__progress-options">
          <button 
            type="button"
            className="return-book__progress-btn"
            onClick={()=> onSubmit}
          >
            Not Started
          </button>
          <button 
            type="button"
            className="return-book__progress-btn"
            onClick={()=> onSubmit}
          >
            Read in Part
          </button>
          <button 
            type="button"
            className="return-book__progress-btn"
            onClick={()=> onSubmit}
          >
            Finished
          </button>
        </div>
      </div>
    </form>
  )
})
