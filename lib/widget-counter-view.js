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

	setConfigValues() {
		this.widgetName = atom.config.get("widget-counter.widgetName");
		this.widgetValue = atom.config.get("widget-counter.widgetValue");
		this.widgetBGColor = atom.config.get("widget-counter.widgetBGColor");
		this.widgetFGColor = atom.config.get("widget-counter.widgetFGColor");
		this.slackToken = atom.config.get("widget-counter.slackToken");
		this.slackChannel = atom.config.get("widget-counter.slackChannel");
	}

	drawElement() {
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

	updateCounterView() {
		this.setConfigValues();
		this.counterValElement.textContent = this.widgetValue;
		this.counterNameElement.textContent = this.widgetName + ": ";
		this.element.style.background = this.widgetBGColor;
		this.element.style.color = this.widgetFGColor;

		this.postToSlack();
	}

	postToSlack() {
		var slackAPIroot = "https://slack.com/api/chat.postMessage";
		var token = "xoxp-363368529604-374089797732-573406368423-339c3c4920bc641184e06ec4b41ea281";
		var channel = "counter";
		var sendtext = encodeURI("countes something");
		// xoxp-363368529604-374089797732-573406368423-339c3c4920bc641184e06ec4b41ea281
		//https://hooks.slack.com/services/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
		// HzuoW73LT9XmgXomxSeG1Xgn
		//token
		//channel
		var data = {};
		var link = slackAPIroot + "token=" + token + "&channel=" + channel + "&text=" + sendtext;
		console.log(link);
		data["token"] = token;
		data["channel"] = channel;
		data["text"] = sendtext;
		window.post = function(slackAPIroot, data, callback) {
			return needle.post(slackAPIroot, data, (err, resp) => {
				return callbak(err, resp);
			});
		}.call();
	}

	increment() {
		atom.config.set("widget-counter.widgetValue", ++this.widgetValue);
	}

	decrement() {
		atom.config.set("widget-counter.widgetValue", --this.widgetValue);
	}

	reset() {
		this.widgetValue = 0;
		atom.config.set("widget-counter.widgetValue", this.widgetValue);
	}



	destroy() {
		//this.clear();
		atom.config.set("widget-counter.widgetValue", this.widgetValue);
		//this.element.removeEventListener("click");
		this.subscriptions.dispose();
		this.element.remove();
	}

}