'use babel';

import WidgetCounterView from './widget-counter-view'

export default {
	config: {
		widgetName: {
			type: 'string',
			title: 'Widget Counter Name',
			description: 'Name to display for the counter',
			default: 'Counter',
			order: 1
		},
		widgetValue: {
			type: 'integer',
			title: 'Widget Counter Value',
			description: 'Initial/Current numeric value for the widget counter',
			default: 0,
			order: 2
		},
		widgetBGColor: {
			type: 'string',
			title: 'Widget Counter Background Color',
			description: 'Background Color of the displayed counter',
			default: 'black',
			order: 3
		}
	},

	activate(state) {},

	deactivate() {
		if (this.widgetCounterView)
			this.widgetCounterView.destroy()
	},

	consumeStatusBar(statusBar) {
		this.widgetCounterView = new WidgetCounterView(statusBar)
		this.widgetCounterView.start()
	}
}