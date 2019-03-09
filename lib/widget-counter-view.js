"use babel";

import {
	CompositeDisposable
} from "atom"

export default class WidgetCounterView {

	constructor(statusBar) {
		this.statusBar = statusBar;
		this.subscriptions = new CompositeDisposable();
	}

	start() {
		this.drawElement();
		this.initialize();
	}

	initialize() {
		this.subscriptions.add(
			atom.commands.add("atom-workspace", {
				"widget-counter:increment": () => this.increment(),
				"widget-counter:decrement": () => this.decrement(),
				"widget-counter:reset": () => this.reset()
			})
		);

		this.subscriptions.add(
			atom.config.onDidChange("widget-counter.widgetName", () => {
				this.updateCounterView();
			})
		);

		this.subscriptions.add(
			atom.config.onDidChange("widget-counter.widgetValue", () => {
				this.updateCounterView();
			})
		);

		this.subscriptions.add(
			atom.config.onDidChange("widget-counter.widgetBGColor", () => {
				this.updateCounterView();
			})
		);
	}

	setConfigValues() {
		this.widgetName = atom.config.get("widget-counter.widgetName");
		this.widgetValue = atom.config.get("widget-counter.widgetValue");
		this.widgetBGColor = atom.config.get("widget-counter.widgetBGColor");
	}

	drawElement() {
		this.setConfigValues();

		this.element = document.createElement("div");
		this.element.classList.add("widget-counter", "inline-block");

		this.counterNameElement = document.createElement("span");
		this.counterNameElement.classList.add("widget-counter-name");

		this.counterValElement = document.createElement("span");
		this.counterValElement.classList.add("widget-counter-value");

		this.element.appendChild(this.counterNameElement);
		this.element.appendChild(this.counterValElement);

		this.counterValElement.textContent = this.widgetValue;
		this.counterNameElement.textContent = this.widgetName + ": ";

		this.statusBar.addRightTile({
			item: this.element,
			priority: -500
		});

		this.element.addEventListener("click", () => this.increment());
	}

	updateCounterView() {
		this.setConfigValues();
		this.counterValElement.textContent = this.widgetValue;
		this.counterNameElement.textContent = this.widgetName + ": ";
	}

	increment() {
		atom.config.set("widget-counter.widgetValue", ++this.widgetValue);
	}

	decrement() {
		atom.config.set("widget-counter.widgetValue", --this.widgetValue);
	}

	reset() {
		atom.config.set("widget-counter.widgetValue", 0);
	}

	destroy() {
		//this.clear();
		this.subscriptions.dispose();
		this.element.remove();
	}

}