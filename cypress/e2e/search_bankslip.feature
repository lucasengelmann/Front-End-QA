Feature: Perform searches and display detailed information in a modal

Scenario: Verifying the explanatory text in the modal after searching for Boleto
  Given I am on the Getnet homepage
  When I hover on the "Sou Cliente" button
  And I click on the "Central de Ajuda" navegation link
  Then I should be redirected to the "Central de Ajuda" page
  And I should see a search field on the page
  When I enter "Boleto" in the search field
  Then I should see the option “Eu concluí a negociação, de que forma receberei meu boleto?”
  When I click on the option “Eu concluí a negociação, de que forma receberei meu boleto?”
  Then a modal should appear
  And the modal should display an explanation related to how to receive the "Boleto" after concluding a negotiation
