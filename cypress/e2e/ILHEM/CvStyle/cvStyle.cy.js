describe("Button CV Style Test", () => {
  beforeEach(() => {
    cy.clearToken();
    cy.connect_as_student();
    cy.visit("/cv");
  });

  it("should change style when clicked", () => {
    let initialStyle;
    cy.get('[data-test="style"]').then(($button) => {
      initialStyle = parseInt($button.text().split("-")[0]);
    });

    cy.get('[data-test="style"]').click();

    cy.get('[data-test="style"]').should(($button) => {
      const newStyle = parseInt($button.text().split("-")[0]);
      expect(newStyle).not.to.equal(initialStyle);
    });
  });
});
