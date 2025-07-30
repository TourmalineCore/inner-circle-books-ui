import './Actions.scss'

import PlusIcon from '../../../../assets/icons/Plus.svg?react'
import ScanIcon from '../../../../assets/icons/Scan.svg?react'

import { observer } from "mobx-react-lite"
import { Button } from '../../../../components/button/Button'
import { addBookRoutes, scanRoutes } from '../../../routes'
import { useMediaQuery } from 'react-responsive'

export const Actions = observer(() => {
  const isScanButtonMobile = useMediaQuery({
    maxWidth: 767,
  })

  const isAddButtonMobile = useMediaQuery({
    maxWidth: 1365,
  })

  return (
    <div className='actions'>
      <div className='actions__scan-button'>
        <Button
          onClick={() => window.location.href = scanRoutes[0].path}
          label={
            isScanButtonMobile 
              ? (
                <ScanIcon />
              ) 
              : (
                <>
                  <ScanIcon /> Scan QR
                </>
              )
          }
          isAccent
          {...(isScanButtonMobile 
            ? {
              isMobile: isScanButtonMobile, 
            } 
            : {})
          }
        />
      </div>
      <div className='actions__add-button'>
        <Button
          onClick={() => window.location.href = addBookRoutes[0].path}
          label={
            isAddButtonMobile 
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
          {...(isAddButtonMobile 
            ? {
              isMobile: isAddButtonMobile, 
            } 
            : {})
          }
        />
      </div>
    </div>
  )
})
