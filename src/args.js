// 解析命令参数
const path = require('path')
const cwd = process.cwd()
const commander = require('commander')

commander
  .version('1.0.0')
  .option(
    '-m, --mockFile [mockFile]', 'mock config file',
    mockFile => path.isAbsolute(mockFile)
      ? mockFile : path.join(cwd, mockFile),
    path.join(cwd, 'mock'))
  .option(
    '-p, --port [port]', 'mock server listen port',
    9005
  )
  .option(
    '-b, --baseUrl [baseUrl]', 'mock server base url',
    '/'
  )
  .parse(process.argv)

module.exports = commander
