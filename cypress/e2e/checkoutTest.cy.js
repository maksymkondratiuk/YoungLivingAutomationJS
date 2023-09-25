beforeEach(() => {
  cy.viewport(1920, 1080)
})

describe('Validate that an order can be checkout', () => {
  it('add order and proceed with checkout', () => {
    cy.visit('https://www.youngliving.com/us/en/')

    //Login with credentials
    cy.get('[data-testid=qa-myaccount]').click({force: true})
    cy.get('#loginUsername').type('cel98@ukr.net')
    cy.get('#continue-btn').click({force: true})
    cy.get('#loginPassword').type('PasswordQA1')
    cy.get('#login-btn').click({force: true})

    //SearchForProduct
    cy.get('[data-testid=qa-search-input]').type('essential oil')
    cy.get('[data-testid=qa-search-input]').type('{enter}')

    //Add to cart first Essentiial Oil product
    cy.get('[data-testid=qa-quick-shop]').first().click()

    //Click View Cart
    cy.get('[data-testid=qa-cartcheckout]').click()

    //Click Checkout
    cy.get('[data-testid=qa-cart-checkout]').click()

    //Handle Exception :D
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Handle the uncaught exception
      console.error('Uncaught Exception:', err.message);
      // Prevent the exception from failing the test
      return false;
    });

    //Skip Refferal section
    cy.get('[data-testid=qa-referral-code-continue]').wait(5000).should('be.visible').click()
    cy.get('[data-testid=qa-confirm-yes]').click()
    cy.wait(3000)

    //Enter Shipping Address
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('Jones')
    cy.get('#addressLine1').type('Elm Street, 1234Rd AL 35203')
    cy.get('#city').type('Centreville')
    cy.get('#zip').type('35042')
    cy.get('[data-testid=qa-state]').select('Alabama')
    cy.get('[data-testid=qa-ship-continue]').click()
    cy.wait(5000)
    cy.get('[data-testid=qa-suggestion-save]').wait(5000).should('be.visible').click()
    cy.get('[data-testid=qa-ship-continue]').click()
    cy.wait(3000)

    //Select Shipping Method
    cy.get('[data-testid=qa-ship-methods-continue]').click()
    cy.wait(3000)

    //Enter Payment Details
    cy.get('[data-testid=qa-card-first-name]').type('Jack')
    cy.get('[data-testid=qa-card-last-name]').type('Jones') 
    cy.get('[data-testid=qa-pay-card]').type('4444444444444444')
    cy.get('[data-testid=qa-pay-month]').type('12')
    cy.get('[data-testid=qa-pay-year]').type('2026')
    cy.get('[data-testid=qa-pay-code]').type('567')
    cy.get('[data-testid=qa-pay-continue]').click()

    //finish
  })
})