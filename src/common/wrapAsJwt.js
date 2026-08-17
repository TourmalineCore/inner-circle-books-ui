export function wrapAsJwt(tokenValue) {
  const header = btoa(JSON.stringify({
    alg: `none`,
    typ: `JWT`,
  }))

  return `${header}.${tokenValue}.`
}
