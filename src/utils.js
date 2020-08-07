export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

export const validateUsername = (username) => {
  const re = /^[A-Za-z0-9 ]+$/
  return re.test(String(username))
}

export const checkPassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/
  return re.test(String(password))
}

export const dateFormatting = (timestamp) => {
  return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`
}

export const dueDateValidation = (start, end) => {
  if (!start || !end || start > end) {
    throw {
      status: 400,
      message: 'Past dates cannot be selected.'
    }
  }
}
