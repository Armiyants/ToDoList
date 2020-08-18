const { validateEmail, validateUsername, checkPassword, dueDateValidation } = require('../utils.js')

describe('testing email address validator', () => {
  test ('properly validates the right email address', () => {
    const email = 'email@email.com'
    expect(validateEmail(email)).toBeTruthy()
  })

  test ('returns false when email address is wrong', () => {
    const email = 'email'
    expect(validateEmail(email)).toBeFalsy()
  })

  test ('returns false when email address is wrong', () => {
    const email = 'email@.123'
    expect(validateEmail(email)).toBeFalsy()
  })
})

describe('testing username validator', () => {
  test ('properly validates the right username', () => {
    const username = 'username'
    expect(validateUsername(username)).toBeTruthy()
  })

  test ('properly validates the username when containing number', () => {
    const username = '1111A'
    expect(validateUsername(username)).toBeTruthy()
  })

  test ('returns false when username contains special char', () => {
    const username = 'username@'
    expect(validateUsername(username)).toBeFalsy()
  })

  test ('returns false when username contains space', () => {
    const username = 'user name'
    expect(validateUsername(username)).toBeFalsy()
  })
})

describe('testing password checker', () => {
  test ('properly checks the password to contain at least 6 chars: at least one lowercase letter, one uppercase letter, one numeric digit, and one special character', () => {
    const password = 'Password1*'
    expect(checkPassword(password)).toBeTruthy()
  })

  test ('checks to return false if the password is more than 30 chars length', () => {
    const password = 'A7*AaaaaaaaaaAaaaaaaaaaAaaaaaaa'
    expect(checkPassword(password)).toBeFalsy()
  })

  test ('checks to return false if the password does not contain digit', () => {
    const password = 'Password*'
    expect(checkPassword(password)).toBeFalsy()
  })

  test ('checks to return false if the password does not contain special char', () => {
    const password = 'Password1'
    expect(checkPassword(password)).toBeFalsy()
  })

  test ('checks to return false if the password does not contain lowercase letter', () => {
    const password = 'PASSWORD1*'
    expect(checkPassword(password)).toBeFalsy()
  })

  test ('checks to return false if the password does not contain uppercase letter', () => {
    const password = 'password1*'
    expect(checkPassword(password)).toBeFalsy()
  })
})


describe('testing due date validator', () => {
  test('validating that throws an error if past date is selected', () => {
    const start = '1597437265980'
    const end = '1594444444112'
    expect(
      () => dueDateValidation(start, end)
    ).toThrowError()
  })

  test('validating that throws an error if start date is not selected', () => {
    const end = '1594444444112'
    expect(
      () => dueDateValidation(start, end)
    ).toThrowError()
  })

  test('validating that throws an error if end date is not selected', () => {
    const start = '1597437265980'
    expect(
      () => dueDateValidation(start, end)
    ).toThrowError()
  })

  test('should not throw an error if no past date is selected', () => {
    const start = '1594444444112'
    const end = '1597437265980'
    expect(
      () => dueDateValidation(start, end)
    ).not.toThrow()
  })
})







