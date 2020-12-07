#!/usr/bin/env node
const fse = require('fs-extra')
const { program } = require('commander')
const version = require('../package.json').version

// 获得用户的输入内容
const getUserInputs = require('./prompts.js')
const downloadTemplate = require('./download')
const updateFilesWithUserInputs = require('./update')

program.version(version, '-v, --version')

program
  .usage('<command> [options]') // 用户使用提示
  .command('create <app-name>') // 如果没有action 会在同目录下找x-init文件执行
  .description('创建一个工程')
  .action(async (name) => {
    const projectPath = `${process.cwd()}/${name}`
    const isExist = fse.existsSync(projectPath)
    const options = await getUserInputs({ isExist, name, projectPath })
    await downloadTemplate(options)
    await updateFilesWithUserInputs(options)
  })

program.parseAsync(process.argv)
