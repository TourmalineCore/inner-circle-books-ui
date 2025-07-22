import './Actions.scss'

import PlusIcon from '../../../../assets/icons/Plus.svg?react'

import { observer } from "mobx-react-lite"
import { Button } from '../../../../components/button/Button'
import { addBookRoutes } from '../../../routes'
import { useMediaQuery } from 'react-responsive'

export const Actions = observer(() => {
  const isMobile = useMediaQuery({
    maxWidth: 1023,
  })

  return (
    <div className='actions'>
      <div className='actions__button'>
        <Button
          onClick={() => window.location.href = addBookRoutes[0].path}
          label={
            isMobile 
              ? (
                <PlusIcon />
              ) 
              : (
                <>
                  <PlusIcon /> Add Book
                </>
              )
          }
          isAccent
          {...(isMobile 
            ? {
              isMobile, 
            } 
            : {})
          }
        />
      </div>
    </div>
  )
})
