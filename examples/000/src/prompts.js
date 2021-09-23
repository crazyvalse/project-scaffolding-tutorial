/**
 * 设置交互的问题
 * 1. mobile 还是 web
 * @type {Array}
 */
const fse = require('fs-extra')
const inquirer = require('inquirer')
const cwd = process.cwd()

const templates = require('../config/default.json').templates
const choices = Object.keys(templates).map((type) => ({
  name: type,
  value: type
}))

const projectNameQuestion = {
  type: 'input',
  message: `请输入项目名称（英文）：`,
  name: 'name',
  validate: function (name) {
    if (!/^[a-zA-Z_][\w_\-]+$/g.test(name)) {
      return '请输入正确的项目名称！'
    }
    if (fse.existsSync(`${cwd}/${name}`)) {
      return '该文件夹已存在！'
    }
    return true
  }
}

const versionQuestion = {
  type: 'input',
  message: `Version: `,
  name: 'version',
  default: '0.1.0',
  validate: function (val) {
    if (/^((\d){1,3}\.(\d){1,3}\.(\d){1,3})$/g.test(val)) {
      // 校验位数
      return true
    }
    return '请输入正确的格式[数字.数字.数字]，例如：11.22.33'
  }
}

const descriptionQuestion = {
  type: 'input',
  message: `请输入项目描述: `,
  name: 'description'
}

const templateQuestion = {
  type: 'list',
  message: `请选择要下载的模板: `,
  name: 'template',
  choices: [...choices]
}

const cliQuestion = {
  type: 'list',
  message: `请选择包管理工具(如果是公司的项目，必须使用yarn！): `,
  name: 'cli',
  choices: [
    {
      name: 'yarn',
      value: 'yarn'
    },
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'cnpm',
      value: 'cnpm'
    }
  ]
}

async function getUserInputs() {
  const answers = await inquirer.prompt([
    projectNameQuestion,
    versionQuestion,
    descriptionQuestion,
    templateQuestion,
    cliQuestion
  ])
  return {
    ...answers,
    projectPath: `${cwd}/${answers.name}`
  }
}

module.exports = getUserInputs

const promise = getUserInputs()
promise.then((answer) => {
  console.info(answer)
})
