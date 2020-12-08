#!/usr/bin/env node
const fse = require('fs-extra')
const { program } = require('commander')
const version = require('../package.json').version
const symbols = require('log-symbols')

// 获得用户的输入内容
const getUserInputs = require('./prompts.js')
const downloadTemplate = require('./download-template')
const updateFilesWithUserInputs = require('./update-files')
const installDependencies = require('./install-dependencies')

program.version(version, '-v, --version')

program
  .usage('<command> [options]') // 用户使用提示
  .command('create <app-name>') // 如果没有action 会在同目录下找x-init文件执行
  .description('创建一个工程')
  .action(async (name) => {
    try {
      const projectPath = `${process.cwd()}/${name}`
      const isExist = fse.existsSync(projectPath)
      // 获得用户在 terminal 上输入的数据 options: { ... }
      const options = await getUserInputs({ isExist, name, projectPath })
      // 从 gitlab 上下载代码并保存为一个文件夹
      await downloadTemplate(options)
      // 把 options 中的内容复写到下载的文件中
      await updateFilesWithUserInputs(options)
      // 执行 (yarn||npm) install 命令下载依赖
      await installDependencies(options)
    } catch (e) {
      console.error(symbols.error, e)
    }
  })

program.parseAsync(process.argv)
