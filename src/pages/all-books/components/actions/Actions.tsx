import './Actions.scss'

import PlusIcon from '../../../../assets/icons/Plus.svg?react'
import ScanIcon from '../../../../assets/icons/Scan.svg?react'
import SearchIcon from '../../../../assets/icons/Search.svg?react'

import { observer } from "mobx-react-lite"
import { Button } from '../../../../components/button/Button'
import { addBookRoutes, scanRoutes } from '../../../routes'
import { useMediaQuery } from 'react-responsive'
import { hasAccessPermission } from '../../../../common/tokenUtils'

export const Actions = observer(({
  query,
  onQueryChange,
}: {
  query: string,
  onQueryChange: (value: string) => void,
}) => {
  const isScanButtonMobile = useMediaQuery({
    maxWidth: 767,
  })

  const isAddButtonMobile = useMediaQuery({
    maxWidth: 1365,
  })

  return (
    <div 
      className="actions"
      data-cy="actions"
    >
      <div className="actions__wrap">
        <div className="actions__search">
          <div className="actions__icon">
            <SearchIcon />
          </div>
          <input
            className="actions__input"
            data-cy="actions-input"
            type="text"
            value={query}
            onChange={(e)=>{
              onQueryChange(e.target.value)
            }}
            placeholder="Search in the Library"
          />
        </div>
        <div className="actions__scan-button">
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
      </div>
      {hasAccessPermission({
        permission: `CanManageBooks`,
      }) && <div className="actions__add-button">
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
      </div>}
    </div>
  )
})
