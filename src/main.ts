import * as core from '@actions/core'

async function run() {
  try {
    const name = core.getInput('name')
    const value = core.getInput('value')
    const newValue = value.replace(/\$(\w+)/g, (_, envVar) =>
      process.env[envVar] !== undefined
        ? (process.env[envVar] as string)
        : envVar,
    )
    core.exportVariable(name, newValue)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
