const { EventEmitter } = require('events')
const mockEmitter = new EventEmitter()
const mockServer = {
  close: jest.fn()
}
const mockApp = {
  listen: jest.fn((port, callback) => {
    callback()
    return mockServer
  })
}

jest.mock('parcel-bundler', () =>
  class Bundler {
    constructor (file) {
      this.file = file
      this.mockEmitter = mockEmitter
      this.bundle = jest.fn(() => mockEmitter.emit('bundled'))
      this.on =
        (event, callback) => this.mockEmitter.on(event, callback)
    }
  }
)

jest.mock('express', () => () => mockApp)
jest.mock('load-uncached', () => jest.fn())
jest.mock('mock-router', () => jest.fn())
jest.mock('args', () => ({
  port: 9005,
  mockFile: 'mock',
  baseUrl: '/'
}))

describe('test server', () => {
  beforeAll(() => {
    require('server')
  })

  it('should start server', () => {
    expect(mockApp.listen).toBeCalled()
  })

  it('should restart server', () => {
    mockEmitter.emit('bundled')
    expect(mockApp.listen).toBeCalled()
    expect(mockServer.close).toBeCalled()
  })
})
