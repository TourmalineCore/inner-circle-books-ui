import './BooksLoader.scss'

export function BooksLoader() {
  return (
    <div 
      className="books-loader"
    >
      <div 
        className="books-loader__spinner"
        data-cy="books-loader"
      />
    </div>
  )
}