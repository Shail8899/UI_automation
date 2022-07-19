import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../support/page-objects/Homepage";
import ProductPage from "../../../../support/page-objects/Productpage";
import Checkout from "../../../../support/page-objects/Checkoutpage";

let price1;
let price2;
let totalPrice;
let name;
const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new Checkout();

Given("I open application", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/shop");
});

When("I add items in the cart", function () {
  productPage.clickShopLink().click();
  const arr = this.mobiledata.mobilename;
  arr.forEach((element) => {
    cy.selectProduct(element);
  });
});

And("remove an item from the cart", function () {
  productPage.checkout().click();
  cy.get(":nth-child(1) > :nth-child(5) > .btn").click();
});

And("validate the total price", function () {
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

Then("i am place to place order successfully", function () {
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

When("I click the homelink", function () {
  homePage.clickHomeLink().click();
});
And("Enter the user details and submit the form", function (dataTable) {
  name = dataTable.rawTable[1][0];
  homePage.enterName().type(name);
  const len = this.data.name.length;
  expect(len).to.be.greaterThan(2);

  homePage.enterName().should("have.attr", "minlength", 2);
  homePage.selectRadioButton3().should("be.disabled");

  homePage.enterEmail().type(this.data.email);
  homePage.enterPassword().type(this.data.password);
  homePage.selectGender().select(this.data.gender);
  homePage.selectRadioButton2().check();
  homePage.enterDob().type(this.data.dob);
  homePage.validateTwoWayBinding().should("have.value", name);
});
Then("I am able to register successfully", function () {
  homePage
    .clickSubmitButton()
    .click()
    .then(function () {
      homePage
        .validateAlert()
        .contains("Success! The Form has been submitted successfully!.");
    });
});
