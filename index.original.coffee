path = require("path")
AtomCounter = require(path.join(__dirname, "lib", "atom-counter"))

module.exports =
  config: {
    "name": {
      "type": "string",
      "title": "Counter Name",
      "description": "Name to display of the counter",
      "default": "Counter"
    },
    "value": {
      "type": "integer",
      "title": "Counter Value",
      "description": "Value of the Counter",
      "default": 0
    }
  }

  atomCounter: null

  activate: () ->

  consumeStatusBar: (statusBar) =>
    @atomCounter = new AtomCounter()
    @atomCounter.create(statusBar)

  deactivate: () =>
    @atomCounter?.destroy()
