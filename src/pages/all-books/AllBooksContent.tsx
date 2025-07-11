import { observer } from "mobx-react-lite"
import { BooksList } from './components/books-list/BooksList'
import { Actions } from './components/actions/Actions'
import { hasAccessPermission } from "../../common/hasAccessPermission"

export const AllBooksContent = observer(({
  cards, 
}: { 
  cards: BookCardType[], 
}) => {

  return (
    <>
      {
        hasAccessPermission({
          permission: `CanManageBooks`,
        }) && <Actions />
      }
      <BooksList cards={cards} />
    </>
  )
})
