const spawn = require('cross-spawn')
const chalk = require('chalk')
const symbols = require('log-symbols')

function install(options) {
  const cwd = options.projectPath || process.cwd()
  console.info(symbols.info, '工程目录：' + cwd)
  return new Promise((resolve, reject) => {
    const command = options.cli || 'npm'
    const args = ['install', '--save', '--save-exact', '--loglevel', 'error']
    // 在下载的目录下执行脚本 yarn || npm 脚本
    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr]
    })

    // 脚本执行完进行回调，返回一个promise
    child.once('close', (code) => {
      if (code !== 0) {
        console.error(symbols.error, chalk.red(`安装依赖失败... 请耗子尾汁...`))
        reject({
          command: `${command} ${args.join(' ')}`
        })
        return
      }
      resolve()
    })
    child.once('error', reject)
  })
}

module.exports = install

// install({
//   projectPath: process.cwd() + '/' + 'hello-world',
//   cli: 'yarn'
// })
