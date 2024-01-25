describe("Pfa page", () => {
  let pfaData;
  beforeEach(() => {
    cy.clearToken();
    cy.connect_as_teacher();
    cy.fixture("pfa.json").then((data) => {
      pfaData = data.pfa;
    });
    cy.visit("/dash/teacher_my_pfa");
  });

  it("displays a list of pfa", () => {
    cy.getByData("table").should("have.length.gte", 1);
  });
  it("Add pfa Successfully", () => {
    cy.getByData("addpfaButton").click();
    cy.getByData("add").should("be.visible");
    cy.getByName("title").type(pfaData.title);
    cy.get("#demo-simple-select").click();
    cy.get('.MuiList-root > [tabindex="0"]').click();

    cy.getByData("desc").type(pfaData.description);

    // Add new technologies
    pfaData.technologies.forEach((tech) => {
      cy.getByData("buttonAddtech").click();
      cy.get('[data-set="technologies"] input[type="text"]').last().type(tech);
    });

    cy.getByData("buttonAddpfa").click();
    cy.wait(1000);

    cy.getByData("add").should("not.exist");
  });

  it("show add pfa Successfully", () => {
    cy.getByData("table").should("contain", pfaData.title);
    cy.getByData("showpfaButton").last().click();
    cy.wait(1000);
    cy.getByData("show").should("be.visible");
  });

  it("Update pfa Successfully", () => {
    cy.getByData("table").should("contain", pfaData.title);
    cy.getByData("updatepfaButton").last().click();
    cy.getByData("edit").should("be.visible");
    cy.getByData("desc").type("description final");
    cy.getByData("confirmUpdateButtonpfa").click();
    cy.wait(1000);
    cy.getByData("table").should("contain", "description final");
    cy.getByData("modal").should("not.exist");
  });

  it("Delete pfa Successfully", () => {
    cy.contains(pfaData.title).should("exist");
    cy.getByData("deletepfaButton").last().click();

    cy.getByData("delet").should("be.visible");
    cy.getByData("confirmDeleteButtonpfa").click();
    cy.wait(1000);
    cy.getByData("delet").should("not.exist");
  });
});
