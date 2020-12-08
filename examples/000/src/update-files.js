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
  const json = fse.readJsonSync(packageJson)
  json.name = options.name
  json.description = options.description
  json.version = options.version
  fse.outputJsonSync(packageJson, json, { spaces: 2 })
}

module.exports = updateFiles
