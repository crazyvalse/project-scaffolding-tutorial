#!/usr/bin/env node

const { program } = require('commander')
const version = require('../package.json').version

program.version(version, '-v, --version')

program
  .command('create <app-name>')
  .description('创建一个新的工程')
  .option('-r, --recursive', 'Remove recursively')
  .action((name, command) => {
    console.info(name)
  })

program.parse(process.argv)
