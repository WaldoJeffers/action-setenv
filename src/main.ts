import * as core from '@actions/core'

const stringify = value =>
  value === undefined ? 'undefined' : JSON.stringify(value)

async function run() {
  try {
    const name = core.getInput('name')
    const value = core.getInput('value')
    process.stdout.write(`process.env.HOME: ${stringify(process.env.HOME)}`)
    process.stdout.write(`value: ${stringify(value)}`)
    const newValue = value.replace(/\$(\w+)/g, envVar => {
      process.stdout.write(`envVar: ${stringify(envVar)}`)
      process.stdout.write(
        `process.env[envVar]: ${stringify(process.env[envVar])}`,
      )
      return process.env[envVar] !== undefined
        ? (process.env[envVar] as string)
        : envVar
    })
    process.stdout.write(`newValue: ${stringify(newValue)}`)
    core.exportVariable(name, newValue)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
