const sendRes = require('send-res')

describe('test sendRes module', () => {
  it('should throw error when res.send is not a function', () => {
    let req = {}
    let res = null
    let data = 100
    const errMsg = 'res.send should be a function'

    expect(() => sendRes(req, res, data)).toThrow(errMsg)

    res = { send: null }
    expect(() => sendRes(req, res, data)).toThrow(errMsg)
  })

  it('should send back response data', () => {
    let req = {}
    let res = { send: jest.fn() }
    let data = { value: 100 }

    sendRes(req, res, data)
    expect(res.send).toBeCalled()

    data = jest.fn((req, res) => { })

    sendRes(req, res, data)
    expect(data).toBeCalled()
  })
})
