## Requirements

* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

* run `yarn install` in ./src
* run `yarn install` in root directory
* change or add paths to your apps node_modules in `watcher.js / packagePaths`

## Scripts

* `yarn watch` in root directory - watches files in the  `./src` folder, compiles them to lib and replacing to app node_modules package.
* `yarn lib` in root directory - to compile files in src to lib folder
* `yarn lib` in src directory - to compile files in src to lib folder

## Contains

This package contains shared `Actions, Reducers, fixtures` and `Utils` which used in apps.
To use them, you need to import them like

`import { actions, reducers } from 'shared-libraries'`

`import { dataActions } from 'shared-libraries/Actions'`

## Notes

Web app initially has a relative path in `package.json` to this package. It means that you must have this package located near your apps folder.

Your app `package.json` must contain a link to this folder if your application uses the data of this package.