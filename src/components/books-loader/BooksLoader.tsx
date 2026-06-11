import './BooksLoader.scss'

export function BooksLoader() {
  return (
    <div 
      className="books-loader-container"
    >
      <div 
        className="books-loader"
        data-cy="books-loader"
      />
    </div>
  )
}