
'use strict'

const fs = require('fs')
const semver = require('semver')
const colors = require('colors')

const levels = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']

module.exports = (packageJsonPath, level) => {

  let packageJson = null
  let packageJsonContents = null

  if (levels.indexOf(level) === -1) {
    return error(`Update type ${level} is not valid.`.red, null)
  }

  try { packageJsonContents = fs.readFileSync(packageJsonPath) }
  catch (e) { return error(`Could not load ${packageJsonPath}`, e) }

  try {packageJson = JSON.parse(packageJsonContents)}
  catch (e) { return error(`Package JSON ${packageJsonPath} is not valid JSON`, e) }

  try { packageJson.version = semver.inc(packageJson.version, level) }
  catch (e) { return error(`Problem incrementing ${packageJson.version} with ${level}`, e) }

  try { fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4)) }
  catch (e) { return error(`Problem writing to ${packageJsonPath}`, e)}

  return 0

}

function error (message, ex) {
  console.error(message.red)
  ex && console.error(colors.red(ex))
  return 1
}
