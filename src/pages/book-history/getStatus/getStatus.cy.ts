import { getStatus } from "./getStatus"

describe(`GetStatus`, getStatusTests)

function getStatusTests() {
  it(`
  GIVEN dueReturnDate=21.08.2025 and currentDate=20.08.2025
  WHEN use getStatus
  SHOULD return '-'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-08-20`),
    })).to.be.eq(`-`)
  })

  it(`
  GIVEN dueReturnDate=21.08.2025 and actualReturnDate=20.08.2025
  WHEN use getStatus
  SHOULD return 'Returned'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      actualReturnDate: `20.08.2025`,
    })).to.be.eq(`Returned`)
  })

  it(`
  GIVEN dueReturnDate=21.08.2025 and currentDate=22.08.2025
  WHEN use getStatus
  SHOULD return '1 day overdue'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-08-22`),
    })).to.be.eq(`1 day overdue`)
  })

  it(`
  GIVEN dueReturnDate=21.08.2025 and currentDate=02.09.2025
  WHEN use getStatus
  SHOULD return '12 days overdue'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-09-02`),
    })).to.be.eq(`12 days overdue`)
  })

  it(`
  GIVEN dueReturnDate=21.08.2025 and currentDate=24.09.2025
  WHEN use getStatus
  SHOULD return '1 month 3 days overdue'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-09-24`),
    })).to.be.eq(`1 month 3 days overdue`)
  })

  it(`
  GIVEN dueReturnDate=21.08.2025 and currentDate=24.09.2026
  WHEN use getStatus
  SHOULD return '1 year 1 month 3 days overdue'
  `, () => {
    expect(getStatus({
      dueReturnDate: `21.08.2025`,
      currentDate: new Date(`2026-09-24`),
    })).to.be.eq(`1 year 1 month 3 days overdue`)
  })
  
}