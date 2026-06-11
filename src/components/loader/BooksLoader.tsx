import './BooksLoader.scss'

export function BooksLoader() {
  return (
    <div 
      className="books-loader-container"
      data-cy="books-loader"
    >
      <div className="books-loader"/>
    </div>
  )
}