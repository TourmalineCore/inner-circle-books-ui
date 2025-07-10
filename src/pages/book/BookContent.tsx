import './BookContent.scss'

import { observer } from "mobx-react-lite"
import { useContext } from 'react'
import { BookStateContext } from './state/BookStateStateContext'
import { Button } from '../AddBook/components/Button/Button'

export const BookContent = observer(() => {

  const bookState = useContext(BookStateContext)

  const {
    title,
    annotation,
    count,
    language,
    // authors,
    bookCoverUrl,
  } = bookState

  return (
    <div 
      className="book"
      data-cy="book"
    >
      <div>{bookCoverUrl}</div>

      <header className='book__title'>
        {title}
      </header>

      <div className='book_characteristics'>
        {/* <div className='book_authors'>{authors}</div> */}
        <div className='book__count'>{count}</div>
        <div className='book__language'>{language}</div>
      </div>
      
      <Button 
        onClick={() => {}}
        label="Take Book"
        className='book__take-button'
        isAccent
      />

      <div className='book__annotation'>{annotation}</div>
    </div>
  )
})
