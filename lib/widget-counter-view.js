'use babel';

import {
	CompositeDisposable
} from 'atom'

export default class WidgetCounterView {

	constructor(statusBar) {
		this.statusBar = statusBar
		this.subscriptions = new CompositeDisposable()
	}

	start() {
		this.drawElement()
		this.initialize()
	}

	initialize() {
		this.setConfigValues()
		
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'widget-counter:incement': () => this.increment(),
				'widget-counter:decrement': () => this.decrement(), //atom.config.set('atom-clock.showUTC', !this.showUTC),
				'widget-counter:reset': () => this.reset()
			})
		)
		
		this.subscriptions.add(
			atom.config.onDidChange('widget-counter.widgetName', () => {
				this.updateCounterView()
			})
		)

		this.subscriptions.add(
			atom.config.onDidChange('widget-counter.widgetValue', () => {
				this.updateCounterView()
			})
		)

		this.subscriptions.add(
			atom.config.onDidChange('widget-counter.widgetBGColor', () => {
				this.updateCounterView()
			})
		)

	}
	
	setConfigValues() {
		this.widgetName = atom.config.get('widget-counter.widgetName')
		this.widgetValue = atom.config.get('widget-counter.widgetValue')
		this.widgetBGColor = atom.config.get('widget-counter.widgetBGColor')
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
		this.counterNameElement.textContent = 'Counter' + ': '

		this.statusBar.addRightTile({
			item: this.element,
			priority: -400
		})
	}


	updateCounterView() {

	}

	increment() {

	}

	decrement() {

	}

	reset() {

	}

}