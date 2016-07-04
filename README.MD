# Semver Version Bumper

Cli utility that updates the given packageJson by the specified level.

It does the following:

1. fetch parameters from command line
2. verify level provided is valid (patch if nothing has been provided)
3. try to open provided json file (package.json in process.cwd() if not provided)
4. try to parse json file as JSON
5. update version with level with semver
6. write the packageJson file to the same location

## Install

```sh
npm install --save-dev semver-bumper
```

## Usage

Typically I'd use this as an npm script:

```json
"scripts": {
  "patch": "semver-bumper patch",
  "minor": "semver-bumper minor",
  "major": "semver-bumper major",
}
```

But you can also use in code.

Return codes:

* -1 nothing happened
* 0 updated successfully
* 1 something went wrong

```js
const semverBumper = require('semver-bumper')
semverBumper() // -1
semverBumper('patch', 'package.json') // 0
semverBumper('noooope') // 1
```

```sh
semver-bumper --version
v1.0.0

semver-bumper --help

semver-bumper [file-name] [type]

no parameters:
- outputs help

one parameter:
- type = parameter 1
- file-name = ./package.json

two parameters:
- type = parameter 1
- file-name = parameter 2
```

This will return exit code 1 if something goes wrong:

* type is invalid
* can't find packageJson file
* packageJson has invalid json
* packageJson doesn't have a version
* can't write packageJson file

It will be deathly silent if everything goes according to plan.
