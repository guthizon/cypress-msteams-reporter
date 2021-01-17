/// <reference types="cypress" />

describe('Allure report reader', () => {
	it('should return the correct application name and version', () => {
		const reportPath = './cypress/fixtures/passed.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.appName).to.equal('Application Under Test')
			expect(result.appVersion).to.equal('vx.x.x')
		})
	})

	it('should return the correct information when report file is empty', () => {
		const reportPath = './cypress/fixtures/emptyReport.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('Test report is empty')
			expect(result.color).to.equal('#000000')
			expect(result.text).to.equal(
				'An error has occured and the test report is empty.'
			)
		})
	})

	it('should return the correct information when all the tests have passed', () => {
		const reportPath = './cypress/fixtures/passed.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('All test cases passed')
			expect(result.color).to.equal('#008000')
			expect(result.text).to.be.empty
		})
	})

	it('should return the correct information when some of the tests have failed', () => {
		const reportPath = './cypress/fixtures/failed.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('2 test case(s) failed')
			expect(result.color).to.equal('#FF0000')
			expect(result.text).to.equal(
				'Failed test case(s): <br/> should return the correct information when some of the tests are broken<br/>should return the correct information when the status of some tests is unknown'
			)
		})
	})
	it('should return the correct information when some of the tests are broken', () => {
		const reportPath = './cypress/fixtures/broken.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('1 test case is broken')
			expect(result.color).to.equal('#FFFF00')
			expect(result.text).to.equal(
				'Broken test case(s): <br/> should return the correct information when report file is empty'
			)
		})
	})

	it('should return the correct information when the status of some tests is unknown', () => {
		const reportPath = './cypress/fixtures/unknown.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('Unknown Status')
			expect(result.color).to.equal('#000000')
			expect(result.text).to.equal(
				'Some of the tests have unknown status or the test results are missing.'
			)
		})
	})

	it('should return the correct information when the test results are missing', () => {
		const reportPath = './cypress/fixtures/missingResults.json'
		const testEnvPath = './cypress/fixtures/envProperties.json'
		cy.task('readAllureReport', { reportPath, testEnvPath }).then((result) => {
			expect(result.title).to.equal('Unknown Status')
			expect(result.color).to.equal('#000000')
			expect(result.text).to.equal(
				'Some of the tests have unknown status or the test results are missing.'
			)
		})
	})
})