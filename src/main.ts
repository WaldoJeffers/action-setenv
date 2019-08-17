import * as core from '@actions/core'

async function run() {
  try {
    const name = core.getInput('name')
    const value = core.getInput('value')
    core.exportVariable(
      name,
      value.replace(/\$(\w+)/g, envVar =>
        process.env[envVar] !== undefined
          ? (process.env[envVar] as string)
          : envVar,
      ),
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
