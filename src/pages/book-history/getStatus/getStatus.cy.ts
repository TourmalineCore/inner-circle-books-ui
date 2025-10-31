import { getStatus } from "./getStatus"

describe(`GetStatus`, getStatusTests)

function getStatusTests() {
  it(`
  GIVEN scheduledReturnDate=21.08.2025 and currentDate=20.08.2025
  WHEN use getStatus
  SHOULD return 'Reading now'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-08-20`),
    })).to.be.eq(`Reading now`)
  })

  it(`
  GIVEN scheduledReturnDate=21.08.2025 and actualReturnedDate=20.08.2025
  WHEN use getStatus
  SHOULD return 'Returned'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      actualReturnedDate: `20.08.2025`,
    })).to.be.eq(`Returned`)
  })

  it(`
  GIVEN scheduledReturnDate=21.08.2025 and currentDate=22.08.2025
  WHEN use getStatus
  SHOULD return 'Reading now, 1 day overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-08-22`),
    })).to.be.eq(`Reading now, 1 day overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=21.08.2025 and currentDate=02.09.2025
  WHEN use getStatus
  SHOULD return 'Reading now, 12 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-09-02`),
    })).to.be.eq(`Reading now, 12 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=21.08.2025 and currentDate=24.09.2025
  WHEN use getStatus
  SHOULD return 'Reading now, 1 month and 3 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      currentDate: new Date(`2025-09-24`),
    })).to.be.eq(`Reading now, 1 month and 3 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=21.08.2025 and currentDate=24.09.2026
  WHEN use getStatus
  SHOULD return 'Reading now, 1 year 1 month and 3 days overdue'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `21.08.2025`,
      currentDate: new Date(`2026-09-24`),
    })).to.be.eq(`Reading now, 1 year 1 month and 3 days overdue`)
  })

  it(`
  GIVEN scheduledReturnDate=24.09.2025 and currentDate=24.09.2025
  WHEN use getStatus
  SHOULD return 'Reading now'
  `, () => {
    expect(getStatus({
      scheduledReturnDate: `24.09.2025`,
      currentDate: new Date(`2025-09-24`),
    })).to.be.eq(`Reading now`)
  })
  
}