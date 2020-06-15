let homePage = require('../pages/home.page')
const data = require('../data/home.param')


describe("CRUD", () => {

	/**
	 * Before All Tests
	 */
	before(() => {

		//Open Test Page
		homePage.open()
		homePage.maximize()

	})

	/* Test 1 */
	it("Can Open Insert item", () => {

		homePage.addItem()
		const editIsOpened = homePage.editIsOpen()
		//Verify Insert Item is Opened
		assert(editIsOpened, 'Wrong state. Sounds like the add item is not opened')
		//close Item window
		homePage.closeAddItemWindow()
	})

	/* Test 2 */
	it("Can Insert new item -- Nominal Case", () => {

		//Insert New Item
		data.ItemInsert.forEach( insertCases => {
			let items = homePage.getnumberofitem()
			//Add Item
			homePage.addItem()
			//fill Item fields
			homePage.setCriteria(insertCases)
			//Click Submit to add Item
			homePage.submitItem()
			//Wait the insert window to be closed -- by checking submit button
			homePage.waitforSubmitNotDisplayed()
			//wait item to be inserted
			homePage.waitItemtoBeInserted(items)
			//Verify that the ITEM is inserted
			assert.equal(true, homePage.waitItemtoBeDisplayed(items))
		})

	})
	/**
	 * Test 3
	 */
	it("Can Verify data of new inserted item ", () => {

		//Insert New Item
		data.ItemData.forEach( insertCases => {

			//First Store number of Item in variable
			let numberofItem = homePage.getnumberofitem()
			//Add Item
			homePage.addItem()
			//fill Item fields
			homePage.setCriteria(insertCases)
			//Click Submit to add Item
			homePage.submitItem()
			//Wait the insert window to be closed -- by checking submit button
			homePage.waitforSubmitNotDisplayed()
			// wait for inserted item to be displayed
			homePage.waitItemtoBeInserted(numberofItem)
			//Verify that the ITEM is correctly inserted by checking data values
			let j = 0
			for (const i in insertCases) {
				assert.equal(insertCases[i], homePage.getlastitemdata(j))
				j++
			}
		})
	})
	/**
	 * Test 4 
	 */
	it("Can Edit last Inserted Item", () => {

		let j = 0
		//Insert New Item
		data.EditFields.forEach( insertCases => {

			//Open Edit Window
			homePage.editlastItem()
			//fill Item fields
			homePage.setCriteria(insertCases)
			//Click Submit to add Item
			homePage.submitItem()
			//Wait the insert window to be closed -- by checking submit button
			homePage.waitforSubmitNotDisplayed()
			// wait for inserted item to be displayed
			homePage.waitItemtoBeInserted((homePage.getnumberofitem()) - 1)
			//Verify that the ITEM is correctly inserted by checking data values

			for (const i in insertCases) {
				assert.equal(insertCases[i], homePage.getlastitemdata(j))
				j++
			}
		})

	})
	/**
	 * Test 5
	 */
	it("Can Delete inserted Item", () => {



		//Initialize loop (Total number of item inserted during the test)		
		let i = data.lineInserted
		while (i >= 1) {
			//First Store the initial number of Items
			let numberofitem = homePage.getnumberofitem()
			//click on delet
			homePage.deletelastItem()
			//Confirm the JS Alert to delet Item
			homePage.confirmItemdeletetion()
			//Check that total number of item is numberofitem -1
			assert.equal(numberofitem - 1, homePage.getnumberofitem())
			i--
		}

	})



	/* After All Tests */
	after (() => {

		//Close Window
		 homePage.close()
	})

})