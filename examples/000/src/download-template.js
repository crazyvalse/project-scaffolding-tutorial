const downloadTemplate = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const symbols = require('log-symbols')

const gitUrl = {
  web: 'https://git.fzyun.net/frontend/docs/templates/web-vue-cli3.git',
  mobile: 'https://git.fzyun.net/frontend/docs/templates/mobile-nuxt.git'
}

async function downloadTemplates(options) {
  return new Promise((resolve, reject) => {
    if (options.isExist) {
      const fse = require('fs-extra')
      fse.removeSync(options.projectPath)
    }
    const spinner = ora(`下载 ${options.template} 模板 中...`).start()
    downloadTemplate(
      `direct:${gitUrl[options.template]}`,
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
