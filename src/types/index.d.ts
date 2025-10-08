type AuthorType = {
  fullName: string,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'bookCopies' | 'employeesWhoReadNow'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id' | 'bookCopies' | 'employeesWhoReadNow'> & {
  countOfCopies: number,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  language: string,
  authors: AuthorType[],
  coverUrl: string,
  bookCopies: BookCopyType[],
  employeesWhoReadNow: EmployeeWhoReadNowType[],
}

type BookCopyType = {
  bookCopyId: number,
  copyNumber: number,
}

type TakeBookType = {
  bookCopyId: number,
  scheduledReturnDate: string,
}

type ReturnBookType = {
  bookCopyId: number,
  progressOfReading: string,
}

type EmployeeWhoReadNowType = {
  employeeId: number,
  fullName: string,
  bookCopyId: number,
}