# dev-mocker


  <img src="https://img.shields.io/teamcity/codebetter/bt428.svg" style="max-width:100%;" />  <img src="https://img.shields.io/badge/coverage-98%25-yellowgreen.svg" />

一款快速搭建用于本地开发的 mock 服务器的 cli 工具。

## 安装方式

```shell
$ npm install -g dev-mocker
```

## 使用方式

```shell
$ dev-mocker -p [port] -m [mockFile] -b [baseUrl]
```

执行上述命令后，会在本地启动一个 mock 服务器，请求访问的基础路径为 `http://localhost:[yourport]/[yourbaseurl]/`。

具体的请求路径以及相应的 mock 响应数据需要在 mockFile 指定的文件中进行配置。

## 命令行参数说明

|参数|默认值|说明|
|---|---|---|
|-p, --port|9005|mock 本地服务器监听端口号
|-m, --mockFile|'mock'|mock 配件文件路径，支持相对路径与绝对路径
|-b, --baseUrl|'/'|mock 请求的基础 url，在配置文件中配置的具体路径都会自动加上该 baseUrl

## mock 配置文件

启动 mock 服务器需要一个配置文件来配置请求的具体路径和具体 mock 数据，mock 文件格式仅支持 .json 和 .js。

mock 配置文件应当输出一个对象，具体写法：

```js
// mock.js
// {[url]: [json|function]}
module.exports = {
  // 直接返回一个 json 数据
  "/example/json": {"value": 1},
  
  // 返回一个函数
  "/example/function": (req,res) => res.send({
    "value": 2
  })
}
```

dev-mocker 搭建的 mock 服务器基于 express 框架，对于配置的响应函数，会提供 express 服务器原生的 [req](http://expressjs.com/zh-cn/4x/api.html#req) 和 [res](http://expressjs.com/zh-cn/4x/api.html#res) 对象作为函数的参数，开发者必须在函数内部手动调用 [res 相关的响应方法](http://expressjs.com/zh-cn/4x/api.html#res) 来响应对应的 mock 请求。

## 热更新

dev-mocker 将配置文件作为 parcel-bundler 的入口文件，每次对配置文件及其依赖的相关文件的改动，都会触发 parcel-bundler 的重新打包以及 mock 服务器的更新。
