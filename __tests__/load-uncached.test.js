jest.mock('args', () => ({}))
const loadUncached = require('load-uncached')

describe('test load-uncached', () => {
  afterAll(() => {
    jest.resetModules()
  })

  it('should throw error when mock config file does not exist', () => {
    expect(() => loadUncached('xxx')).toThrow(/xxx/)
  })

  it('should require uncached module', () => {
    const moduleExport = loadUncached('../src/args')
    expect(moduleExport).toEqual({})
  })
})
