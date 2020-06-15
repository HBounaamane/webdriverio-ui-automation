"use strict"
let Page = require('./base.page')

class HomePage extends Page {

	/**************************
	 * Home Page Web Elements *
	 **************************/
	/**
	 * Add New Item Elements
	 */

	//Add Item button
	get additem() { return $('button=Add Item') }

	//Add new Item "Title Element"
	get edititem() { return $('h5=Add New Item') }

	//First Name ELement
	get firstName() {
		return $('#first')
	}
	//Last Name Elemet
	get lastName() {
		return $('#last')
	}
	//Email Elemet
	get email() {
		return $('#email')
	}
	//Phone Element
	get phone() {
		return $('#phone')
	}
	//Location Element
	//Phone Element
	get location() {
		return $('#location')
	}

	//Hobby Element
	get hobby() {
		return $('#hobby')
	}
	//Submit Button
	get submit() {
		return $('button=Submit')
	}
	//Close Element
	get closeAddItembuton() {
		return $('.modal-content .close')
	}
	//Row Element
	get itemTable() {
		return $('tbody')
	}
	//Main Element Item content
	get ItemMainElement() {
		return $('.modal-content .modal-body')
	}

	//Edit Button 
	get editButton() {
		return $('button=Edit')
	}
	// Delete Button
	get deleteButton() {
		return $('button=Del')
	}

	/***************************************
	 * Home Page function for Web Elements *
	 ***************************************/

	/**
	 * Function to click on Add Item Button Element
	 */

	addItem() {
		const addItemAction = this.additem
		addItemAction.click()
	}

	/**
	 * Function to verify if Add new Item window is opened
	 */

	editIsOpen() {
		let exist = false
		browser.waitUntil(
			() => {
				const edititem = this.edititem
				exist = edititem.isExisting()
				return exist
			},
			3000,
			"expected edit window is not opened" //TimeOut MSG when Verification is KO
		)
		return exist
	}

	/**
	 * Fucntion to Click on Submit Button
	 */
	submitItem() {

		const element = this.submit
		browser.waitUntil(() => {
			return this.isElementEnabled(element)

		}, 6000, 'Submit button not Enabled')
		this.clickJS(element)
	}

	/**
	 * 
	 * @param {Element} element function that use JavaScrit to click on element
	 */
	clickJS(element) {

		browser.execute('arguments[0].click()', element)

	}

	/**
	 * @param {Element} element function that verify if element is enabled
	 */
	isElementEnabled(element) {
		return element.isEnabled()
	}

	/**
	 * function to waitforexist with reverse param for submit button
	 */
	waitforSubmitNotDisplayed() {
		let submitelement = this.submit
		submitelement.waitForDisplayed(2000, true, 'Submit Button still displayed')

	}

	/**
	 * 
	 * @param {Number} index funtion that returns the text of the given index of item of the last line inserted
	 * '0' fist name '1' last name ect
	 */
	getlastitemdata(index) {
		const table = this.itemTable
		let line = table.$$('tr')
		let numberofitem = line.length
		const row = line[numberofitem - 1].$$('td')
		return row[index].getText()
	}
	/**
	 * Function to close AddItemWindow
	 */

	closeAddItemWindow() {

		(this.closeAddItembuton).click()

	}

	/**
	 * 
	 * @param {*} criteria function to set value for input elments using data in ../data/*.param.js
	 */

	setCriteria(criteria) {

		for (const inputKey in criteria) {

			/* select element */
			let elementSelector = $('#' + inputKey)
			elementSelector.waitForDisplayed(2000)
			elementSelector.setValue(criteria[inputKey])
		}
	}
	/**
	 * 
	 * @param {Number} index wait for the given line (index) for item to be displayed in the CRUD table 
	 */
	waitItemtoBeDisplayed(index) {
		let element = (this.itemTable).$$('tr')
		return element[index].waitForDisplayed(2000, "Item is not displayed")

	}
	/**
	 * 
	 * @param {Number} index wait for the given line (index) for item to be created in the CRUD table
	 */
	waitItemtoBeInserted(index) {
		let element = (this.itemTable).$$('tr')
		element[index].waitForExist(2000, "Item is not inserted")

	}
	/**
	 * wait Item to be deleted
	 */
	waitItemtobeDeleted(index) {

		let element = (this.itemTable).$$('tr')
		element[index].waitForExist(2000, true, "Item is not deleted")

	}

	/**
	 * Function to edit last Item
	 */
	editlastItem() {
		const table = this.itemTable
		let line = table.$$('tr')
		let numberofitem = line.length
		const row = (line[numberofitem - 1].$$('td'))
		const l = row.length
		let editItem = row[l - 1].$('button=Edit')
		editItem.click()
	}

	/**
	 * function to delete Item
	 */
	deletelastItem() {

		const table = this.itemTable
		let line = table.$$('tr')
		let numberofitem = line.length
		const row = (line[numberofitem - 1].$$('td'))
		const l = row.length
		let deleteItem = row[l - 1].$('button=Del')
		this.clickJS(deleteItem)
	}

	confirmItemdeletetion() {
		browser.acceptAlert()
	}

	/**
	 * function to return number of Item
	 */
	getnumberofitem() {
		const table = this.itemTable
		let line = table.$$('tr')
		return line.length
	}


}


module.exports = new HomePage()
