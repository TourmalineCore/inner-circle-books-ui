import './BookReaders.scss'

export const BookReaders = ({
  employeesWhoReadNow,
}: {
  employeesWhoReadNow: EmployeeWhoReadNowType[],
}) => {
  if (employeesWhoReadNow.length === 0) return null

  return (
    <div className='book-readers'>
      <div className='book-readers__title'>
        Reading Now
        <span className='book-readers__list'>
          {Array
            .from(
              new Map(
                employeesWhoReadNow
                  .map(reader => [
                    reader.employeeId,
                    reader.fullName,
                  ]))
                .values())
            .join(`, `)}
        </span>
      </div>
    </div>
  )
}
