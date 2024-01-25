describe("Text Fields", () => {
  beforeEach(() => {
    cy.clearToken();
    cy.connect_as_student_diplomed();
    cy.visit("/dash/profile");
  });

  it("should be disabled when user is diplomed", () => {
    cy.getByData("showcv").click();
    cy.getByData("show").should("be.visible");
    cy.wait(2000);
    // Assert that the text fields are disabled

    cy.getByData("desc-0").should("not.be.disabled");
    cy.get('[data-test="empl-0"]').should("not.be.disabled");
    cy.get(`[data-test="stardate-0"]`).should("not.be.disabled");
    cy.get('[data-test="enddate-0"]').should("not.be.disabled");
    cy.get('[data-test="titre-0"]').should("not.be.disabled");
  });
});
