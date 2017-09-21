var npm = require('npm')
var fs = require('fs-extra')
var chokidar = require('chokidar')

var packagePaths = [
  '../customer-wallet/node_modules/shared-libraries/lib'
]

var watcher = chokidar.watch('./src', {
  persistent: true
})

watcher
  .on('ready', onReady)
  .on('change', runCompileAndMoveFiles)
  .on('unlink', onDelete)

function onReady () {
  watcher.on('add', runCompileAndMoveFiles)
  runCompileAndMoveFiles()
}

function onDelete (filePath) {
  var fileWithoutSrc = stripFirstDirectory(filePath)

  fs.removeSync(`./lib/${fileWithoutSrc}`)
  runCompileAndMoveFiles()
}

function runCompileAndMoveFiles () {
  var options = { clobber: true } //overwrite directory

  try {
    npm.load({}, function (err) {
      npm.commands.run(['lib'], function (err, data) {
        packagePaths.forEach((path) => {
          fs.copy('./lib', path, options)
        })
      })
    })
  } catch (e) {
    console.log(e)
  }
}

function stripFirstDirectory (filePath) {
  return filePath.split('/').splice(1, filePath.length - 1).join('/')
}
