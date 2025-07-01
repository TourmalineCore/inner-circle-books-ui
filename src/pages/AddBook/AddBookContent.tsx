import './AddBookContent.scss'

import BookIcon from '../../assets/icons/Book.svg?react'
import EnglishFlag from '../../assets/icons/English-flag.svg?react'
import RussianFlag from '../../assets/icons/Russian-flag.svg?react'

import { observer } from "mobx-react-lite"
import { CounterInput } from './components/CounterInput/CounterInput'
import { RadioGroup } from './components/RadioGroup/RadioGroup'
import { DynamicInputList } from './components/DynamicInputList/DynamicInputList'
import { ImagePreviewInput } from './components/ImagePreviewInput/ImagePreviewInput'
import { useContext } from 'react'
import { AddBookStateContext } from './state/AddBookStateStateContext'

export const AddBookContent = observer(({
  onSubmit,
}:{
  onSubmit: () => void,
}) => {
  const addBookState = useContext(AddBookStateContext)

  return (
    <form 
      className="add-book-form"
      data-cy="add-book-form"
    >
      <header className="add-book-form__header">
        <BookIcon className='add-book-form__icon'/>
        New Book
      </header>
      <div className="add-book-form__right">

        <label className="add-book-form__label">
        Title*
          <textarea
            data-cy="add-book-form-title"
            value={addBookState.title}
            placeholder="Enter the title of the book"
            onChange={(e) => addBookState.setTitle(e.target.value)}
            className={`add-book-form__textarea add-book-form__title ${addBookState.errors.title ? `error` : ``}`}
          />

        </label>

        <div className="add-book-form__wrap">
          <CounterInput
            data-cy="add-book-form-counter"
            label="Number of Copies*"
            value={addBookState.count}
            onChange={addBookState.setCount.bind(addBookState)}
          />

          <RadioGroup
            data-cy="add-book-form-language"
            label="Language*"
            value={addBookState.language}
            onChange={addBookState.setLanguage.bind(addBookState)}
            options={[
              {
                value: `rus`,
                label: `Russian`,
                icon: <RussianFlag />, 
              },
              {
                value: `eng`,
                label: `English`,
                icon: <EnglishFlag />, 
              },
            ]}
          />
        </div>
        <label className="add-book-form__label">
        Annotation*
          <textarea
            data-cy="add-book-form-annotation"
            value={addBookState.annotation}
            placeholder="Enter the annotation from the title page of the book"
            onChange={(e) => addBookState.setAnnotation(e.target.value)}
            className={`add-book-form__textarea add-book-form__annotation ${addBookState.errors.annotation ? `error` : ``}`}
          />
        </label>

        <DynamicInputList
          label="Authors*"
          data-cy="add-book-form-authors"
          values={addBookState.authors}
          onChange={addBookState.setAuthor.bind(addBookState)}
          onAdd={addBookState.addAuthor.bind(addBookState)}
          onRemove={addBookState.removeAuthor.bind(addBookState)}
          placeholder="Enter author full name"
          error={addBookState.errors.authors}
        />
      </div>
      <div className="add-book-form__left">
        <ImagePreviewInput
          data-cy="add-book-form-cover"
          label="Book Cover"
          url={addBookState.coverUrl}
          onChange={addBookState.setCoverUrl.bind(addBookState)}
        />
      </div>
      <div className="add-book-form__actions">
        <button 
          type="button"
          onClick={() => addBookState.reset()}
          className="add-book-form__cancel"
        >
            Cancel
        </button>
        <button 
          type="button"
          data-cy="add-book-form-add"
          onClick={onSubmit} 
          className="add-book-form__add"
        >
            Add
        </button>
      </div>
    </form>
  )
})
