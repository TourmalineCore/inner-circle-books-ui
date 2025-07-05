import './Actions.scss'

import { observer } from "mobx-react-lite"
import { Button } from '../../../../../AddBook/components/Button/Button'
import { addBookRoutes } from '../../../../../routes'

export const Actions = observer(() => {
  return (
    <div className='actions'>
      <div className='actions__button'>
        <Button 
          onClick={() => window.location.href = addBookRoutes[0].path}
          label="+ Add Book"
        />
      </div>
    </div>
  )
})
