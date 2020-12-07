const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const symbols = require('log-symbols')

async function downloadTemplates(options) {
  if (options.isExist) {
    const fse = require('fs-extra')
    fse.removeSync(options.projectPath)
  }
  return new Promise((resolve, reject) => {
    const spinner = ora(`下载 ${options.template} 模板 中...`).start()
    download(
      'direct:https://git.fzyun.net/frontend/docs/webpack-tutorial.git',
      options.name,
      { clone: true },
      (err) => {
        if (err) {
          spinner.fail()
          console.error(
            symbols.error,
            chalk.red(`${err} \ndownload template fail,please check your network connection and try again`)
          )
          reject(err)
          process.exit(1)
        }
        spinner.succeed()
        resolve(options)
      }
    )
  })
}

module.exports = downloadTemplates
