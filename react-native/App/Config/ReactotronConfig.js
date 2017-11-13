const Reactotron = require('reactotron-react-native').default
const errorPlugin = require('reactotron-react-native').trackGlobalErrors
const { reactotronRedux } = require('reactotron-redux')

if (__DEV__) {
  Reactotron
    .configure({
      name: 'Calculator'
    })
    .use(errorPlugin({
      // ignore all error frames from react-native (for example)
      veto: (frame) =>
      frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))
    .use(reactotronRedux({
      onRestore: state => state
    }))
    .connect()

  Reactotron.clear()

  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
