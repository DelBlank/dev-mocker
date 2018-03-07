// 动态加载非缓存模块
module.exports = module => {
  let moduleExport
  try {
    const modulePath = require.resolve(module)
    // 删除所有缓存模块
    for (let key in require.cache) {
      delete require.cache[key]
    }

    moduleExport = require(modulePath)
  } catch (err) {
    throw new Error(`dev-mocker: can not load module ${module}`)
  }

  return moduleExport
}
