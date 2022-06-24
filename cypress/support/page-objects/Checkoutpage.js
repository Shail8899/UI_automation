class Checkout {
  clickProceedButton() {
    return cy.get(":nth-child(3) > :nth-child(5) > .btn");
  }

  enterCountryName() {
    return cy.get("#country");
  }

  selectCountry() {
    return cy.get(".suggestions > ul > li > a");
  }
  agreeTC() {
    return cy.get("#checkbox2");
  }

  clickSubmitButton() {
    return cy.get(".ng-untouched > .btn");
  }

  successMessage() {
    return cy.get("strong");
  }
}

export default Checkout;
