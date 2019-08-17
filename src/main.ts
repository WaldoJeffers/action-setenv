import * as core from '@actions/core'

async function run() {
  try {
    const name = core.getInput('name')
    const value = core.getInput('value')
    core.debug(`Got ${name}: ${value} as input`)
    core.exportVariable(name, value)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
