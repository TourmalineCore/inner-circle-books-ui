import './BookInfo.scss'

import { Language } from '../../../../common/enums/language'

export const BookInfo = ({
  authors,
  language,
  count,
}: {
  authors: { 
    fullName: string, 
  }[],
  language: string,
  count: number,
}) => {
  return (
    <ul className='book-info'>
      <li className='book-info__field'>
        Author
        <span className='book-info__value'>
          {
            authors
              .map(author => author.fullName)
              .join(`, `)
          }
        </span>
      </li>

      <li className='book-info__field'>
        Number of Copies
        <span className='book-info__value'>
          {count}
        </span>
      </li>
              
      <li className='book-info__field'>
        Language
        <span className='book-info__value'>
          {
            language === Language.RU
              ? `Russian` 
              : `English`
          }
        </span>
      </li>
    </ul>
  )
}
