/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe("admin Script", () => {
  describe("CONNECT AS TEACHER", () => {
    let data;

    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_teacher();

      cy.visit("/dash/gest_students");
    });

    it("displays a list of  Students", () => {
      cy.getByData("table").should("have.length.gte", 1);
    });
    it("See CV Student", () => {
      cy.get("table tbody tr")
        .first()
        .find("td")
        .eq(3)
        .then((emailCell) => {
          cy.get(`[data-test="cvButton-${emailCell.text()}"]`).click();
          data = emailCell.text();
        });
      cy.location("pathname").should(
        "eq",
        "/dash/gest_students/cv/643817fdb7a1349c33a4849b"
      );
    });
  });
});
