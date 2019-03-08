(function() {
	var AtomCounter, path;

	path = require("path");

	AtomCounter = require(path.join(__dirname, "lib", "atom-counter"));

	module.exports = {
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
		},
		atomCounter: null,
		activate: function() {},
		consumeStatusBar: (function(_this) {
			return function(statusBar) {
				_this.atomCounter = new AtomCounter();
				return _this.atomCounter.create(statusBar);
			};
		})(this),
		deactivate: (function(_this) {
			return function() {
				var _ref;
				return (_ref = _this.atomCounter) != null ? _ref.destroy() : void 0;
			};
		})(this)
	};

}).call(this);