#!/usr/bin/env node

// mock 服务器
const Bundler = require('parcel-bundler')
const express = require('express')
const mockRouter = require('./mock-router')
const loadUncached = require('./load-uncached')
const {
  port,
  mockFile,
  baseUrl
} = require('./args')

let mockConfig, server, app
let firstStart = true

const bundler = new Bundler(mockFile, {
  cache: false,
  hmrPort: 0
})

// 监听打包成功事件
bundler.on('bundled', () => {
  if (server) {
    server.close()
    firstStart = false
  }
  app = express()

  // 获取 mock 配置文件， 文件不存在就报错
  mockConfig = loadUncached(mockFile)

  // 设置路由
  mockRouter(app, { mockConfig, baseUrl })

  server = app.listen(
    port,
    () => console.log(
      `dev-mocker server ${firstStart ? 'start' : 'restart'} at ${port}`
    )
  )
})

// 开始打包
bundler.bundle()
