(function() {
	var AtomCounter, CompositeDisposable,
		__bind = function(fn, me) {
			return function() {
				return fn.apply(me, arguments);
			};
		};

	CompositeDisposable = require("atom").CompositeDisposable;

	module.exports = AtomCounter = (function() {
		function AtomCounter() {
			this.create = __bind(this.create, this);
			this.statusBar = null;
			this.value = atom.config.get("atom-counter.value");
			this.name = atom.config.get("atom-counter.name");
			this.subscriptions = new CompositeDisposable();
			this.element = document.createElement("div");
			this.element.classList.add("atom-counter", "inline-block");
			this.counterElement = document.createElement("span");
			this.counterElement.classList.add("atom-counter-value");
			this.element.appendChild(this.counterElement);
			this.counterElement.textContent = this.name + ": " + this.value;
			this.subscriptions.add(atom.config.onDidChange("atom-counter.value", (function(_this) {
				return function() {
					_this.value = atom.config.get("atom-counter.value");
					_this.name = atom.config.get("atom-counter.name");
					return _this.counterElement.textContent = _this.name + ": " + _this.value;
				};
			})(this)));
		}

		AtomCounter.prototype.create = function(statusBar) {
			this.statusBar = statusBar;
			this.statusBar.addRightTile({
				"item": this.element,
				"priority": 0
			});
			return this.element.addEventListener("click", (function(_this) {
				return function() {
					return atom.config.set("atom-counter.value", ++_this.value);
				};
			})(this));
		};

		AtomCounter.prototype.destroy = function() {
			atom.config.set("atom-counter.value", this.value);
			this.removeEventListener("click");
			this.subscriptions.dispose();
			return this.element.remove();
		};

		return AtomCounter;

	})();

}).call(this);