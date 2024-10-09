   class InsertKeyWord {
   elements = {
     keyWordInput: () => cy.get('#faq-search-input'),
     inputDoubt: () => cy.get('[href="https://site.getnet.com.br/duvidas/solucao-de-dividas/?modal_open=692"] > .c-search-dropdown-link__item > .c-search-dropdown-link__title'),
   }

   typeDoubt(text) {
     if (!text) return;
     this.elements.keyWordInput().clear().type(text);
   }
}

const insertKeyWord = new InsertKeyWord();

describe('Perform searches and display detailed information in a modal', () => {

   it('Verifying the explanatory text in the modal after searching for "Boleto"', () => {

     // Given I am on the Getnet homepage
     cy.visit('https://site.getnet.com.br/');
     
     // When I hover on the "Sou Cliente" button
     cy.get('#menu-header-login-1 > :nth-child(1) > .gnt-nav-button')
       .should('be.visible')
       .realHover('mouse')
       .then(() => {
          // And I click on the "Central de Ajuda" navegation link
          cy.get('#menu-header-login-1 > :nth-child(1) > .gnt-nav-menu-depth2 > :nth-child(1) > .gnt-nav-menu > :nth-child(5) > #menu-ajuda-sou-cliente-central-ajuda')
            .click();
       });

     // Simulate mouse move out (hover out) to close the overlay
     cy.get('.gnt-brand-desktop').realHover('mouse')

     // Then I should be redirected to the "Central de Ajuda" page
     cy.url().should('include', '/duvidas/');
   
     // Wait for the search field to become visible
     insertKeyWord.elements.keyWordInput().should('be.visible');
 
     // When I enter "Boleto" in the search field
     insertKeyWord.typeDoubt('Boleto');
 
     // Then I should see the option “Eu concluí a negociação, de que forma receberei meu boleto?”
     insertKeyWord.elements.inputDoubt().should('be.visible');
 
     // When I click on the option “Eu concluí a negociação, de que forma receberei meu boleto?”
     insertKeyWord.elements.inputDoubt().click();

     // Then a modal should appear
     cy.get('.is-modal-open').should('be.visible');
 
     // Then the modal should display an explanation related to how to receive the "Boleto" after concluding a negotiation
     cy.get('.is-modal-open > .o-modal__content > .o-modal__title').should('contain', 'Eu concluí a negociação, de que forma receberei meu boleto?');
   
   });
});