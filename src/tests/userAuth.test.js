const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const findByIdMock = jest.fn()
const mockedFn = jest.fn().mockReturnValue({
  findById: findByIdMock
})

jest.spyOn(mongoose, 'model').mockImplementation(mockedFn)


const auth = require('../middlewares/auth.js').default
//
// expect(mockedFn).toBeCalledTimes(1)
// expect(mockedFn).toBeCalledWith('User')
// findByIdMock.mockReturnValue(Promise.resolve(null))
// findByIdMock.mockReturnValue(Promise.resolve({}))
// expect(findByIdMock).toBeCalledTimes(1)
// expect(findByIdMock).toBeCalledWith(id)


describe('user authentication flow testing', () => {
  test('throw an error when there is no authHeader', async () => {
    const mockedRes = {
      status: jest.fn(),
      send: jest.fn()
    }
    mockedRes.status.mockReturnValue(mockedRes) //like returning 'this'
    await auth({
      headers: {}
    }, mockedRes)

    expect(mockedRes.status).toBeCalledTimes(1)
    expect(mockedRes.status).toBeCalledWith(401)
    expect(mockedRes.send).toBeCalledTimes(1)
    expect(mockedRes.send).toBeCalledWith('unauthorized')
  })

  test('throw an error when the token is not provided', async () => {
    const mockedRes = {
      status: jest.fn(),
      send: jest.fn()
    }
    mockedRes.status.mockReturnValue(mockedRes)
    await auth({
      headers: {
        authorization: 'aaaaaaa'
      }
    }, mockedRes)

    expect(mockedRes.status).toBeCalledTimes(1)
    expect(mockedRes.status).toBeCalledWith(401)
    expect(mockedRes.send).toBeCalledTimes(1)
    expect(mockedRes.send).toBeCalledWith('unauthorized')
  })

  test('throw an error when the token is invalid', async () => {
    const mockedRes = {
      status: jest.fn(),
      send: jest.fn()
    }
    mockedRes.status.mockReturnValue(mockedRes)

    const token = 'Bearer Tandz'
    jest.spyOn(jwt, 'verify').mockImplementation((_token, secret) => {
      expect(_token).toBe('Tandz')
      throw new Error()
    })

    auth({
      headers: {
        authorization: token
      }
    }, mockedRes)

    expect(mockedRes.status).toBeCalledTimes(1)
    expect(mockedRes.status).toBeCalledWith(401)
    expect(mockedRes.send).toBeCalledTimes(1)
    expect(mockedRes.send).toBeCalledWith('unauthorized')
  })

  test('finds user when token is valid', async () => {
    const mockedRes = {
      status: jest.fn(),
      send: jest.fn()
    }
    mockedRes.status.mockReturnValue(mockedRes)

    const token = 'Bearer Tandz'
    jest.spyOn(jwt, 'verify').mockImplementation((_token, secret) => {
      expect(_token).toBe('Tandz')
      return true
    })

    auth({
      headers: {
        authorization: token
      }
    }, mockedRes)

    const User = mongoose.model('User')

    User.findById = jest.fn().mockReturnValue(Promise.resolve({
      id: "userid"
    }))
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
})

