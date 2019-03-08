import {
	CompositeDisposable
} from 'atom'

//var AtomCounter, path;
//path = require("path");
//AtomCounter = require(path.join(__dirname, "lib", "atom-counter"));
export default class WidgetCounter {
	config: {
			widgetName: {
				type: "string",
				title: "Widget Counter Name",
				description: "Name to display for the counter",
				default: "Counter",
				order: 1
			},
			widgetValue: {
				type: "integer",
				title: "Widget Counter Value",
				description: "Initial/Current numeric value for the widget counter",
				minimum: 0,
				default: "0",
				order: 2
			},
			widgetBGColor: {
				type: "string",
				title: "Widget Counter Background Color",
				description: "Background Color of the displayed counter",
				default: "black",
				order: 3
			}
		},
		atomCounter: null,

		activate(state) {},

		deactivate() {
			if (this.AtomCounter)
				this.AtomCounter.destroy()
		}

	consumeStatusBar(statusBar) {
		this.widgetCounter = new WidgetCounter(statusBar)
		this.widgetCounter.start()
	}

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