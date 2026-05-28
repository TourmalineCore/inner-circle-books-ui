import { getStatus } from "./getStatus"

describe(`GetStatus`, getStatusTests)

function getStatusTests() {
  it(`
  GIVEN scheduledReturnDate=2025-08-21 and currentDate=2025-08-20
  WHEN use getStatus
  SHOULD return 'Reading now'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      currentDate: new Date(`2025-08-20`),
    })).to.be.eq(`Reading now`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-08-21 and actualReturnedDate=2025-08-20
  WHEN use getStatus
  SHOULD return 'Returned'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      actualReturnedDate: `2025-08-20`,
    })).to.be.eq(`Returned`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-08-21 and currentDate=2025-08-22
  WHEN use getStatus
  SHOULD return 'Reading now, 1 day overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      currentDate: new Date(`2025-08-22`),
    })).to.be.eq(`Reading now, 1 day overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-08-21 and currentDate=2025-09-02
  WHEN use getStatus
  SHOULD return 'Reading now, 12 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      currentDate: new Date(`2025-09-02`),
    })).to.be.eq(`Reading now, 12 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-08-21 and currentDate=2025-09-24
  WHEN use getStatus
  SHOULD return 'Reading now, 1 month and 3 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      currentDate: new Date(`2025-09-24`),
    })).to.be.eq(`Reading now, 1 month and 3 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-08-21 and currentDate=2026-09-24
  WHEN use getStatus
  SHOULD return 'Reading now, 1 year 1 month and 3 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-08-21`,
      currentDate: new Date(`2026-09-24`),
    })).to.be.eq(`Reading now, 1 year 1 month and 3 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=2025-09-24 and currentDate=2025-09-24
  WHEN use getStatus
  SHOULD return 'Reading now'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `2025-09-24`,
      currentDate: new Date(`2025-09-24`),
    })).to.be.eq(`Reading now`)
  })
  
}