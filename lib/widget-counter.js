import {
	CompositeDisposable
} from 'atom'

export default class AtomCounter {

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
	}

	constructor() {

	}

	destroy() {

	}
}