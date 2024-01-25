describe("GestionAlumini", () => {
  beforeEach(() => {
    cy.clearToken();
    cy.connect_as_superadmin();

    cy.visit("/dash/validateAlumini");
    cy.intercept("GET", "/api/student/getall", {
      fixture: "aluminies.json",
    }).as("fetchAluminies");
    cy.visit("/dash/validateAlumini");
  //  cy.wait("@fetchAluminies");
  });

  it("should display the list of aluminies", () => {
    cy.get("[data-testid=aluminiTableContainer]").within(() => {
      cy.getByData("aluminiTableRow").should("have.length.gt", 0);

      // Verify the content of the first alumini record
 

      // ... Add assertions for other alumini records
    });
  });

  it("should validate an alumini registration", () => {
    cy.get("[data-testid=aluminiTableContainer]").within(() => {
      cy.getByData("aluminiTableRow").eq(0).within(() => {
        cy.get("[data-test=validateBtn]").click();
      });
    });

  


  });
});
