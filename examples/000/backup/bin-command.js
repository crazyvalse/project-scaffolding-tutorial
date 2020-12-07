#!/usr/bin/env node

const { program } = require('commander')
const version = require('../package.json').version

program.version(version, '-v, --version')

program
  .usage('<command> [options]') // 用户使用提示
  .command('create <app-name>') // 如果没有action 会在同目录下找x-init文件执行
  .description('创建一个工程')
  .action((name) => {
    console.info(`项目名称： ${name}`)
  })

program.parse(process.argv)
