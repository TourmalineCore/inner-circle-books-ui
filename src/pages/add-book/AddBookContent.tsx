import './AddBookContent.scss'

import BookIcon from '../../assets/icons/Book.svg?react'
import EnglishFlag from '../../assets/icons/English-flag.svg?react'
import RussianFlag from '../../assets/icons/Russian-flag.svg?react'

import { observer } from "mobx-react-lite"
import { CounterInput } from './components/counter-input/CounterInput'
import { RadioGroup } from './components/radio-group/RadioGroup'
import { DynamicInputList } from './components/dynamic-input-list/DynamicInputList'
import { ImagePreviewInput } from './components/image-preview-input/ImagePreviewInput'
import { useContext, useState } from 'react'
import { AddBookStateContext } from './state/AddBookStateStateContext'
import { Button } from '../../components/button/Button'
import { Overlay } from './components/overlay/Overlay'

export const AddBookContent = observer(({
  onSubmit,
  goToBooksList,
}:{
  onSubmit: () => void,
  goToBooksList: () => void,
}) => {
  const addBookState = useContext(AddBookStateContext)
  
  const [
    showModal,
    setShowModal,
  ] = useState(false)

  const handleCancel = () => {
    if (addBookState.isSomethingFilledWithinTheForm()) {
      setShowModal(true)
    }
    else {
      goToBooksList()
    }
  }
  
  const handleConfirmQuit = () => {
    addBookState.reset()
    setShowModal(false)

    goToBooksList()
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {
        showModal && (
          <Overlay 
            data-cy="add-book-overlay"
            onQuit={handleConfirmQuit}
            onCloseModal={handleCloseModal}
          />
        )
      }

      <form 
        className="add-book"
        data-cy="add-book"
      >
        <header className="add-book__header">
          <BookIcon className='add-book__icon'/>
          New Book
        </header>

        <div className="add-book__right">
          <label className="add-book__label">
            Title*
            <textarea
              required
              data-cy="add-book-title"
              value={addBookState.book.title}
              placeholder="Enter the title of the book"
              onChange={(e) => addBookState.setTitle({
                title: e.target.value,
              })}
              className={`add-book__textarea add-book__title ${addBookState.errors.isTitleError
                ? `error` 
                : ``}`}
            />
          </label>

          <div className="add-book__wrap">
            <CounterInput
              data-cy="add-book-counter"
              label="Number of Copies*"
              value={addBookState.book.count}
              onChange={(count) => addBookState.setCount({
                count,
              })}
            />

            <RadioGroup
              data-cy="add-book-language"
              label="Language*"
              value={addBookState.book.language}
              onChange={(language) => addBookState.setLanguage({
                language,
              })}
              options={[
                {
                  value: `ru`,
                  label: `Russian`,
                  icon: <RussianFlag />, 
                },
                {
                  value: `en`,
                  label: `English`,
                  icon: <EnglishFlag />, 
                },
              ]}
            />
          </div>

          <label className="add-book__label">
            Annotation*
            <textarea
              data-cy="add-book-annotation"
              value={addBookState.book.annotation}
              placeholder="Enter the annotation from the title page of the book"
              onChange={(e) => addBookState.setAnnotation({
                annotation: e.target.value,
              })}
              className={`add-book__textarea add-book__annotation ${addBookState.errors.isAnnotationError
                ? `error` 
                : ``}`}
            />
          </label>

          <DynamicInputList
            label="Authors*"
            data-cy="add-book-authors"
            values={addBookState.book.authors.map(author => author.fullName)}
            onChange={(index, author) => {
              addBookState.setAuthor({
                index,
                authorFullName: author,
              })
            }}
            onAdd={() => {
              addBookState.addAuthor()
            }}
            onRemove={(index) => {
              addBookState.removeAuthor({
                index,
              })
            }}
            placeholder="Enter author full name"
            error={addBookState.errors.isAuthorsError}
          />
        </div>

        <div className="add-book__left">
          <ImagePreviewInput
            data-cy="add-book-cover"
            label="Book Cover"
            url={addBookState.book.bookCoverUrl}
            onChange={(bookCoverUrl) => addBookState.setBookCoverUrl({
              bookCoverUrl,
            })}
          />
        </div>

        <div className="add-book__actions">
          <Button 
            onClick={handleCancel}
            label="Cancel"
          />

          <Button 
            onClick={onSubmit}
            label={addBookState.isSaving 
              ? `Adding` 
              : `Add`}
            isAccent
            isDisable={addBookState.isSaving}
            isLoader={addBookState.isSaving}
          />
        </div>
      </form>
    </>
  )
})
