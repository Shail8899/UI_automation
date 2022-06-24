/// <reference types="cypress" />

import HomePage from "../../support/page-objects/Homepage";
import ProductPage from "../../support/page-objects/Productpage";
import Checkout from "../../support/page-objects/Checkoutpage";

let price1;
let price2;
let totalPrice;
const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new Checkout();

describe("Shop", () => {
  before(function () {
    cy.visit(Cypress.env("url") + "/angularpractice/shop");

    cy.fixture("login").then((data) => {
      this.data = data;
    });

    cy.fixture("searchproduct").then((mobiledata) => {
      this.mobiledata = mobiledata;
    });
  });

  describe("SignUp & Order Placement", function () {
    it("should able to signup successfully", function () {
      homePage.clickHomeLink().click();
      homePage.enterName().type(this.data.name);
      const len = this.data.name.length;
      expect(len).to.be.greaterThan(2);

      homePage.enterName().should("have.attr", "minlength", 2);
      homePage.selectRadioButton3().should("be.disabled");

      homePage.enterEmail().type(this.data.email);
      homePage.enterPassword().type(this.data.password);
      homePage.selectGender().select(this.data.gender);
      homePage.selectRadioButton2().check();
      homePage.enterDob().type(this.data.dob);
      homePage.validateTwoWayBinding().should("have.value", this.data.name);
      homePage
        .clickSubmitButton()
        .click()
        .then(function () {
          homePage
            .validateAlert()
            .contains("Success! The Form has been submitted successfully!.");
        });
    });

    it("should able to add multiple product in the basket", function () {
      productPage.clickShopLink().click();
      const arr = this.mobiledata.mobilename;
      arr.forEach((element) => {
        cy.selectProduct(element);
      });
    });

    it("should able to remove product from the basket", function () {
      productPage.checkout().click();
      cy.get(":nth-child(1) > :nth-child(5) > .btn").click();
    });

    it("should able to validate the total amount successfully", function () {
      var sum = 0;
      let pp;
      productPage.getproductFinalPrice().each(($el, index, $list) => {
        const price = $el.text();
        const res = price.split(" ");
        const productPrice = res[1].trim();

        sum = Number(sum) + Number(productPrice);
      });
      productPage.getTotalPrice().then(function (element) {
        const actualTotal = element.text();
        const res = actualTotal.split(" ");
        const total = res[1].trim();
        expect(sum).to.eql(Number(total));
      });
    });

    it("should able to click on checkout button and checkout successfully", function () {
      checkoutPage.clickProceedButton().click();
      checkoutPage.enterCountryName().type("In");
      checkoutPage.selectCountry().each(($el, index, $list) => {
        if ($el.text().includes("India")) {
          cy.wrap($el).click();
        }
      });
      checkoutPage.agreeTC().click({ force: true });
      checkoutPage.clickSubmitButton().click();
      checkoutPage.successMessage().contains("Success!");
    });
  });
});
