import { isSafeReturnUrl } from "./isSafeReturnUrl"

describe(`IsSafeReturnUrl`, () => {
  it(`
  GIVEN safe returnUrl
  WHEN isSafeReturnUrl is called
  SHOULD return true
  `, () => {
    expect(isSafeReturnUrl({
      returnUrl: `http://localhost:30090/books`,
      baseUrl: `http://localhost:30090`, 
    }))
      .to
      .be
      .true
  })

  it(`
  GIVEN safe returnUrl with query parameters
  WHEN isSafeReturnUrl is called
  SHOULD return true
  `, () => {
    expect(isSafeReturnUrl({
      returnUrl: `http://localhost:30090/books?copyId=1&s=2222`,
      baseUrl: `http://localhost:30090`, 
    }))
      .to
      .be
      .true
  })

  it(`
  GIVEN unsafe returnUrl
  WHEN isSafeReturnUrl is called
  SHOULD return false
  `, () => {
    expect(isSafeReturnUrl({
      returnUrl: `http://attacker-site.com/fake-login`,
      baseUrl: `http://localhost:30090`, 
    }))
      .to
      .be
      .false
  })

  it(`
  GIVEN safe returnUrl but has a nested unsafe returnUrl
  WHEN isSafeReturnUrl is called
  SHOULD return false
  `, () => {
    expect(isSafeReturnUrl({
      returnUrl: `http://localhost:30090?returnUrl=http://attacker-site.com/fake-login`,
      baseUrl: `http://localhost:30090`, 
    }))
      .to
      .be
      .false
  })
})