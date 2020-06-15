"use strict"

class BasePage {
	constructor() {
	}

	getTitle() {
		return browser.getTitle()
	}

	open() {
		browser.url('/')
	}
	//Maximize Browser page
	maximize() {
		browser.maximizeWindow()
	}
	close() {
		browser.closeWindow()
	}
	refreshPage() {
		browser.refresh()
	}

}

module.exports = BasePage
