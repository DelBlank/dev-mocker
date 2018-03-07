// 发送响应的 mock 数据
module.exports = (req, res, data) => {
  if (!res || typeof res.send !== 'function') {
    throw new Error('res.send should be a function')
  }

  typeof data === 'function' ? data(req, res) : res.send(data)
}
