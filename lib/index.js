
'use strict'

const path = require('path')
const fs = require('fs')
const semver = require('semver')
const colors = require('colors')

const levels = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']

module.exports = (...args) => {

  let level
  let packageJsonPath
  let packageJson = null
  let packageJsonContents = null

  switch (args.length) {
  case 0:
    return -1
  case 1:
    level = args[0]
    packageJsonPath = path.join(process.cwd(), './package.json')
    break
  case 2:
    level = args[0]
    packageJsonPath = path.resolve(args[1])
    break
  default:
    return -1
  }

  if (levels.indexOf(level) === -1) {
    return error(`Update type ${level} is not valid.`.red, null)
  }

  try { packageJsonContents = fs.readFileSync(packageJsonPath) }
  catch (e) { return error(`Could not load ${packageJsonPath}`, e) }

  try {packageJson = JSON.parse(packageJsonContents)}
  catch (e) { return error(`Package JSON ${packageJsonPath} is not valid JSON`, e) }

  try { packageJson.version = semver.inc(packageJson.version, level) }
  catch (e) { return error(`Problem incrementing ${packageJson.version} with ${level}`, e) }

  try { fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`) }
  catch (e) { return error(`Problem writing to ${packageJsonPath}`, e)}

  return 0

}

function error (message, ex) {
  console.error(message.red)
  ex && console.error(colors.red(ex))
  return 1
}
