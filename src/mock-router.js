const path = require('path')
const sendRes = require('./send-res')
// mock 路由
module.exports = (app, { mockConfig, baseUrl }) => {
  if (!app || typeof app.all !== 'function') {
    throw new Error('app.all must be a function')
  }

  // 设置路由
  Object.keys(mockConfig || {}).map(mock => {
    app.all(
      path.join('/', baseUrl, mock),
      (req, res) => sendRes(req, res, mockConfig[mock])
    )
  })
}
