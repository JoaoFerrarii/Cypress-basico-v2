Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
        cy.get('#firstName').type('joao victor')
        cy.get('#lastName').type('silva')
        cy.get('#email').type('teste@testegmail.com.br')
        cy.get('#open-text-area').type('testeeee')
        cy.get('button[type="submit"]').click()
})
