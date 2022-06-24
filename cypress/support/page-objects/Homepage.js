class HomePage {
  clickHomeLink() {
    return cy.get(".nav-link").eq(0);
  }

  enterName() {
    return cy.get(":nth-child(1) > .form-control");
  }

  selectRadioButton3() {
    return cy.get("#inlineRadio3");
  }

  enterEmail() {
    return cy.get(":nth-child(2) > .form-control");
  }

  enterPassword() {
    return cy.get("#exampleInputPassword1");
  }

  selectGender() {
    return cy.get("#exampleFormControlSelect1");
  }

  selectRadioButton2() {
    return cy.get("#inlineRadio2");
  }

  enterDob() {
    return cy.get(":nth-child(8) > .form-control");
  }

  validateTwoWayBinding() {
    return cy.get(".ng-untouched");
  }

  clickSubmitButton() {
    return cy.get(".btn");
  }

  validateAlert() {
    return cy.get(".alert");
  }
}

export default HomePage;
