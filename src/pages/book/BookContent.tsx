import './BookContent.scss'

import NoImage from "../../assets/img/no-image.png"

import { observer } from "mobx-react-lite"
import { useContext } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../../components/button/Button'
import { useImageValid } from '../../common/useImageValid'
import clsx from 'clsx'

export const BookContent = observer(() => {

  const bookState = useContext(BookStateContext)

  const isValidUrl = useImageValid(bookState.bookCoverUrl)
  
  return (
    <div 
      className="book"
      data-cy="book"
    >
      <div className='book__left'>
        <img
          src={isValidUrl 
            ? bookState.bookCoverUrl 
            : NoImage
          }
          alt="Preview"
          className={clsx(`book__cover`, { 
            'book__cover--no-image': !isValidUrl,
          })}
        />
      </div>
      <div className='book__right'>
        <header className='book__title'>
          {bookState.title}
        </header>
        <div className='book__wrap'>
          <ul className='book__characteristics'>
            <li className='book__field'>
          Author
              <span className='book__value'>
                {bookState.authors
                  .map(author => author.fullName)
                  .join(`, `)}
              </span>

            </li>
            <li className='book__field'>
          Language
              <span className='book__value'>
                {bookState.language === `rus` 
                  ? `Russian` 
                  : `English`}
              </span>
            </li>
          </ul>
      
          <Button 
            onClick={() => {}}
            label="Take Book"
            className='book__take-button'
            isAccent
          />
        </div>
        <h5 className='book__section-name'>Annotation</h5>
        <div className='book__annotation'>{bookState.annotation}</div>
      </div>
    </div>
  )
})
