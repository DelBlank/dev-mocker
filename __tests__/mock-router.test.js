jest.mock('path', () => ({
  join: jest.fn()
}))

jest.mock('send-res', () => jest.fn())

const mockRouter = require('mock-router')
const app = {
  all: jest.fn((url, callback) => callback())
}

describe('test mock-router', () => {
  afterAll(() => {
    jest.resetModules()
  })

  it('should throw error if app.all is not a function', () => {
    const err = 'app.all must be a function'
    expect(() => mockRouter({}, {})).toThrow(err)
  })

  it('should set app router', () => {
    mockRouter(app, {})
    mockRouter(app, {
      mockConfig: {
        '/example': { value: 1 }
      }
    })

    expect(app.all).toBeCalled()
  })
})
