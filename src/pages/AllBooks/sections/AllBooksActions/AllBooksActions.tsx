import './AllBooksActions.scss'

import { observer } from "mobx-react-lite"
import { Button } from '../../../AddBook/components/Button/Button'
import { addBookRoutes } from '../../../routes'

export const AllBooksActions = observer(() => {
  return (
    <div className='all-books-actions'>
      <div className='all-books-actions__button'>
        <Button 
          onClick={() => window.location.href = addBookRoutes[0].path}
          label="+ Add Book"
        />
      </div>
    </div>
  )
})
