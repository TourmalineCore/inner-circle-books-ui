type AuthorType = {
  fullName: string,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'bookCopiesIds'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id' | 'bookCopiesIds'> & {
  countOfCopies: number,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  language: string,
  authors: AuthorType[],
  coverUrl: string,
  bookCopiesIds: number[],
  employeesWhoReadNow: EmployeeWhoReadNowType[],
}

type TakeBookType = {
  bookCopyId: number,
  sсheduledReturnDate: string,
}

type ReturnBookType = {
  bookCopyId: number,
  progressOfReading: string,
}

type EmployeeWhoReadNowType = {
  employeeId: number,
  fullName: string,
}