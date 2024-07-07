describe('EzJob App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('manuel@gmail.com', 'contraseña12345');
  });

  it('should show all tabs after login', () => {
    cy.get('ion-tab-button[tab="inicio"]').should('be.visible');
    cy.get('ion-tab-button[tab="mi-cuenta"]').should('be.visible');
    cy.get('ion-tab-button[tab="empleos"]').should('be.visible');
    cy.get('ion-tab-button[tab="favoritos"]').should('be.visible');
    cy.get('ion-tab-button[tab="ajustes"]').should('be.visible');
  });

  it('should navigate to Inicio page', () => {
    cy.get('ion-tab-button[tab="inicio"]').click();
    cy.url().should('include', '/tabs/inicio');
    cy.get('ion-title').contains('Inicio');
  });

  it('should navigate to Mi Cuenta page', () => {
    cy.get('ion-tab-button[tab="mi-cuenta"]').click();
    cy.url().should('include', '/tabs/mi-cuenta');
    cy.get('ion-title').contains('Mi Cuenta');
  });

  it('should navigate to Empleos page', () => {
    cy.get('ion-tab-button[tab="empleos"]').click();
    cy.url().should('include', '/tabs/empleos');
    cy.get('ion-title').contains('Empleos');
  });

  it('should search for jobs', () => {
    cy.get('ion-tab-button[tab="empleos"]').click();
    cy.get('ion-searchbar').type('Desarrollador{enter}');
    cy.get('ion-card').should('exist');
  });

  it('should navigate to Favoritos page', () => {
    cy.get('ion-tab-button[tab="favoritos"]').click();
    cy.url().should('include', '/tabs/favoritos');
    cy.get('ion-title').contains('Favoritos');
  });

  it('should save a job as favorite', () => {
    cy.get('ion-tab-button[tab="empleos"]').click();
    cy.get('ion-card')
      .first()
      .within(() => {
        cy.get('ion-button').contains('Guardar').click();
      });
    cy.get('ion-tab-button[tab="favoritos"]').click();
    cy.get('ion-card').should('exist');
  });

  it('should navigate to Ajustes page', () => {
    cy.get('ion-tab-button[tab="ajustes"]').click();
    cy.url().should('include', '/tabs/ajustes');
    cy.get('ion-title').contains('Ajustes');
  });
});
