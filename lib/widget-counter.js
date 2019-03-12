"use babel";

import WidgetCounterView from "./widget-counter-view"

export default {
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
			default: 0,
			order: 2
		},
		widgetBGColor: {
			type: "string",
			title: "Widget Counter Background Color",
			description: "Background Color of the displayed counter",
			default: "black",
			order: 3
		},
		widgetFGColor: {
			type: "string",
			title: "Widget Counter Foreground Color",
			description: "Foreground Color of the displayed counter",
			default: "white",
			order: 4
		},
		slackToken: {
			type: "string",
			title: "Slack API Token",
			description: "In order to post the message to slack, you need an API token",
			default: "",
			order: 5
		},
		slackChannel: {
			type: "string",
			title: "Slack Channel",
			description: "The channel on slack to post the message",
			default: "General",
			order: 6
		},
		slackMessage: {
			type: "string",
			title: "Slack Message",
			description: "Alternative message to display",
			default: "NEW TOTAL: ",
			order: 7
		}
	},

	activate(state) {},

	deactivate() {
		if (this.widgetCounterView) {
			this.widgetCounterView.destroy();
		}
	},

	consumeStatusBar(statusBar) {
		this.widgetCounterView = new WidgetCounterView(statusBar);
		this.widgetCounterView.start();
	}
}