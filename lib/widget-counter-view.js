'use babel';

import {
	CompositeDisposable
} from 'atom'

let widgetCounter = null

export default class WidgetCounterView {

	constructor(statusBar) {
		this.statusBar = statusBar
		this.subscriptions = new CompositeDisposable
	}

	start() {
		this.drawElement()
		this.initialize()
	}

	initialize() {

	}

	drawElement() {
		this.element = document.createElement('div')
		this.element.classList.add('widget-counter', 'inline-block')

		this.counterNameElement = document.createElement('span')
		this.counterNameElement.classList.add('widget-counter-name')

		this.counterValElement = document.createElement('span')
		this.counterValElement.classList.add('widget-counter-value')

		this.element.appendChild(this.counterNameElement)
		this.element.appendChild(this.counterValElement)

		this.counterValElement.textContent = 0
		this.counterNameElement.textContent = "Counter" + ": "

		this.statusBar.addRightTile({
			item: this.element,
			priority: -500
		})
	}

}