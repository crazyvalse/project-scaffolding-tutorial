const fse = require('fs-extra')

function updateFiles(options) {
  return new Promise((resolve, reject) => {
    // 更新 package.json
    updatePackageJson(options)
    resolve()
  })
}

function updatePackageJson(options) {
  const packageJson = `${options.projectPath}/package.json`
  // 1. 同步读取json文件
  const json = fse.readJsonSync(packageJson)
  // 2. 修改文件
  json.name = options.name
  json.description = options.description
  json.version = options.version
  // 3. 生成 json 文件
  fse.outputJsonSync(packageJson, json, { spaces: 2 })
}

module.exports = updateFiles

// updateFiles({
//   projectPath: process.cwd() + '/' + 'hello-world',
//   name: 'hello-world',
//   description: 'description',
//   version: '1.1.1'
// })
