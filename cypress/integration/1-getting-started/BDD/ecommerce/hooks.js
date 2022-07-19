beforeEach(function () {
  cy.fixture("login").then((data) => {
    this.data = data;
  });

  cy.fixture("searchproduct").then((mobiledata) => {
    this.mobiledata = mobiledata;
  });
});
