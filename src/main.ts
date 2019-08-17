import * as core from '@actions/core'

async function run() {
  try {
    const name = core.getInput('name')
    const value = core.getInput('value')
    process.stdout.write(process.env.HOME as string)
    process.stdout.write(value)
    const newValue = value.replace(/\$(\w+)/g, envVar => {
      process.stdout.write(envVar)
      process.stdout.write(process.env[envVar] as string)
      return process.env[envVar] !== undefined
        ? (process.env[envVar] as string)
        : envVar
    })
    process.stdout.write(newValue)
    core.exportVariable(name, newValue)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
