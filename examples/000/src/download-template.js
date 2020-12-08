const fse = require('fs-extra')
const downloadTemplate = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const symbols = require('log-symbols')

// 模板的下载地址
const templateGitUrls = require('../config/default.json').templates

async function downloadTemplates(options) {
  return new Promise((resolve, reject) => {
    // 删除与项目同名的文件夹
    if (fse.existsSync(options.projectPath)) {
      const fse = require('fs-extra')
      fse.removeSync(options.projectPath)
    }
    // 下载模板
    const spinner = ora(`下载 ${options.template} 模板 中...`).start()
    downloadTemplate(
      `direct:${templateGitUrls[options.template].url}`,
      options.name,
      { clone: true },
      (err) => {
        if (err) {
          spinner.fail()
          console.error(
            symbols.error,
            chalk.red(`${err} \n下载模板失败，可能是网络问题...`)
          )
          reject(err)
          process.exit(1)
        }
        spinner.succeed('下载成功！')
        resolve(options)
      }
    )
  })
}

module.exports = downloadTemplates
