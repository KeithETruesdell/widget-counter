"use babel";

import {
	CompositeDisposable
} from "atom";

export default class WidgetCounterView {

	function constructor(statusBar) {
		this.statusBar = statusBar;
		this.subscriptions = new CompositeDisposable();
	}

	function start() {
		this.drawElement();
		this.initialize();
	}

	function initialize() {
		this.setConfigValues();

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

		this.subscriptions.add(
			atom.config.onDidChange("widget-counter.widgetFGColor", () => {
				this.updateCounterView();
			})
		);

		this.updateCounterView();
	}

	function setConfigValues() {
		this.widgetName = atom.config.get("widget-counter.widgetName");
		this.widgetValue = atom.config.get("widget-counter.widgetValue");
		this.widgetBGColor = atom.config.get("widget-counter.widgetBGColor");
		this.widgetFGColor = atom.config.get("widget-counter.widgetFGColor");
		this.slackToken = atom.config.get("widget-counter.slackToken");
		this.slackChannel = atom.config.get("widget-counter.slackChannel");
		this.slackMessage = atom.config.get("widget-counter.slackMessage");
	}

	function drawElement() {
		this.element = document.createElement("div");
		this.element.classList.add("widget-counter", "inline-block");

		this.counterNameElement = document.createElement("span");
		this.counterNameElement.classList.add("widget-counter-name");

		this.counterValElement = document.createElement("span");
		this.counterValElement.classList.add("widget-counter-value");

		this.element.appendChild(this.counterNameElement);
		this.element.appendChild(this.counterValElement);

		this.statusBar.addRightTile({
			item: this.element,
			priority: -500
		});

		this.element.addEventListener("click", () => this.increment());
	}

	function updateCounterView() {
		this.setConfigValues();
		this.counterValElement.textContent = this.widgetValue;
		this.counterNameElement.textContent = this.widgetName + ": ";
		this.element.style.background = this.widgetBGColor;
		this.element.style.color = this.widgetFGColor;
	}

	function postToSlack() {
		if (this.slackChannel !== "" && this.slackToken !== "") {
			var slackAPIroot = "https://slack.com/api/chat.postMessage";
			var slackText = this.slackMessage;
			var sendText = "";
			if (this.widgetValue === 0) {
				sendText = encodeURI(this.widgetName + " reset");
			} else {
				sendText = encodeURI(slackText + " " + this.widgetValue + " " + this.widgetName + (this.widgetValue > 1 && (this.widgetName).slice(-1).toLowerCase() !== "s" ? "s" : "") + ((this.widgetName).slice(0, 5).toLowerCase() !== "count" ? " counted" : ""));
			}
			var xhr = new XMLHttpRequest();
			xhr.open("POST", slackAPIroot + "?channel=" + this.slackChannel + "&token=" + this.slackToken + "&text=" + sendText);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function() {
				if (xhr.status !== 200) {
					Console.log(xhr.status);
					Console.log(xhr.responseText);
				}
			};
			xhr.send();
		}
	}

	function increment() {
		atom.config.set("widget-counter.widgetValue", ++this.widgetValue);
		this.postToSlack();
	}

	function decrement() {
		atom.config.set("widget-counter.widgetValue", --this.widgetValue);
		this.postToSlack();
	}

	function reset() {
		this.widgetValue = 0;
		atom.config.set("widget-counter.widgetValue", this.widgetValue);
		this.postToSlack();
	}

	function destroy() {
		atom.config.set("widget-counter.widgetValue", this.widgetValue);
		this.subscriptions.dispose();
		this.element.remove();
	}

}