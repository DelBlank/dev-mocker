let mockFile = ''

describe('test args module', () => {
  beforeEach(() => {
    jest.mock('commander', () => {
      let commander = {
        version: () => commander,
        parse: () => commander
      }

      commander.option = jest.fn()
        .mockImplementationOnce((arg, usage, data) => {
          commander.mockFile = data(mockFile)
          return commander
        })
        .mockImplementationOnce((arg, usage, data) => {
          commander.port = data
          return commander
        })
        .mockImplementationOnce((arg, usage, data) => {
          commander.baseUrl = data
          return commander
        })

      return commander
    })
  })

  afterEach(() => {
    jest.resetModules()
    mockFile = '/'
  })

  it('should parse args', () => {
    let args = require('args')
    expect(args.baseUrl).toEqual('/')
    expect(args.port).toEqual(9005)
    expect(args.mockFile).toMatch(/dev-mocker$/)
  })

  it('should parse args when mockFile is absolute path', () => {
    let args = require('args')
    expect(args.mockFile).toEqual('/')
  })
})
