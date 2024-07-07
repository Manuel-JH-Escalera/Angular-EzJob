/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//@ts-ignore
Cypress.Commands.add('login', (email, password) => {
  // @ts-ignore
  cy.get('ion-input[formControlName="email"]').type(email);
  cy.get('ion-input[formControlName="password"]').type(password);
  cy.get('ion-button[type="submit"]').click();

  // Espera a que aparezca el loader
  cy.get('ion-loading').should('be.visible');

  // Espera a que desaparezca el loader (con un timeout de 5000ms)
  cy.get('ion-loading', { timeout: 5000 }).should('not.exist');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
