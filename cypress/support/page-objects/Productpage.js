class ProductPage {
  clickShopLink() {
    return cy.get(":nth-child(2) > .nav-link");
  }

  getproductName() {
    return cy.get("h4[class='media-heading']");
  }

  getproductPrice() {
    return cy.get("[class='table table-hover'] tbody tr td:nth-child(3)");
  }

  getproductFinalPrice() {
    return cy.get(
      "[class = 'table table-hover'] tbody tr td:nth-child(4) strong"
    );
  }

  getTotalPrice() {
    return cy.get("[class= 'text-right'] strong");
  }

  checkout() {
    return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link");
  }
}

export default ProductPage;
