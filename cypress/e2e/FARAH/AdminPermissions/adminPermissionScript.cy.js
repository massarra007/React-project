/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe("admin Script", () => {
  let adminData;
  describe("CONNECT AS SUPERADMIN", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.fixture("admin.json").then((data) => {
        adminData = data.admin;
      });
      cy.visit("/dash/GestionDesAdmin");
    });

    it("displays a list of  Admins", () => {
      cy.getByData("table").should("have.length.gte", 1);
    });
    it("Add Admin Successfully", () => {
      cy.getByData("addadminButton").click();
      cy.getByData("modal").should("be.visible");

      cy.getByName("firstName").type(adminData.firstName);
      cy.getByName("lastName").type(adminData.lastName);
      cy.getByName("phoneNumber").type(adminData.phoneNumber);
      cy.getByName("birthDate").typeDate(adminData.birthDate);
      cy.getByName("email").type(adminData.email);
      cy.get("#genre-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      //   cy.get("#permission-select").click();
      //   cy.get("#permission-select-option-1").click();
      //   cy.get("#permission-select-option-0").click();
      cy.getByData("buttonAddadmin").click();
      cy.contains("Adminstrateur Ajouter avec Succès.").should("be.exist");
      cy.getByData("modal").should("not.exist");
    });
    it("Check if  admin added in the table  Successfully", () => {
      cy.get("table tbody tr")
        .last()
        .then((lastRow) => {
          cy.wrap(lastRow).contains("td", adminData.firstName);
        });
    });

    it("Add admin Already Exist With Same email ", () => {
      cy.getByData("addadminButton").click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("firstName").type(adminData.firstName);
      cy.getByName("lastName").type(adminData.lastName);
      cy.getByName("phoneNumber").type(adminData.phoneNumber);
      cy.getByName("birthDate").typeDate(adminData.birthDate);
      cy.getByName("email").type(adminData.email);
      cy.get("#genre-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      cy.get("#permission-select").click();
      cy.get("#permission-select-option-1").click();
      cy.get("#permission-select-option-0").click();
      cy.getByData("buttonAddadmin").click();
      cy.wait(1000);
      cy.getByData("modal").should("be.exist");
      cy.getByData("modal").should("contain", "Email déja existe");
    });
    it("Update Admin Permission  to Manage Teacher And Student", () => {
      cy.getByData("table").should("contain", adminData.firstName);
      cy.get(`[data-test="updateButton-${adminData.phoneNumber}"]`).click();
      cy.get("#permission-select").click();
      cy.get("#permission-select-option-1").click();
      cy.get("#permission-select-option-0").click();
      cy.getByData("buttonAddadmin").click();

      cy.contains("Adminstrateur modifier avec Succès.").should("be.visible");
      cy.getByData("modal").should("not.exist");
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(7)
        .then((permissionCell) => {
          expect(permissionCell)
            .to.contain("teacher")
            .and.to.contain("student");
        });
    });
  });

  describe("CONNECT AS ADMIN ", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_with_actual_data(adminData.phoneNumber);
      cy.visit("/dash/main");
    });
    it("Check if Admin Have Access To Manage Student", () => {
      cy.visit("/dash/gest_students");
      cy.wait(1000);
      cy.get(".styles_container__82D-V").contains("Gestion Des Etudiants");
    });
    it("Check if Admin Have Access To Manage Teacher", () => {
      cy.visit("/dash/GestionDesEnseignants");
      cy.wait(1000);
      cy.get(".styles_container__82D-V").contains("Gestion Des Enseignant");
    });
    it("Check if Admin Have Access To Manage Event", () => {
      cy.visit("/dash/GestionDesEvenement");
      cy.wait(1000);
      cy.contains("Gestion Des Evénenements").should("not.exist");
    });
  });

  describe("CONNECT AS SUPERADMIN ", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.visit("/dash/GestionDesAdmin");
    });
    it("Delete Admin Successfully", () => {
      cy.get(`[data-test="deleteButton-${adminData.phoneNumber}"]`).click();
      cy.wait(1000);
      /// cy.getByData("modal").should("be.exist");
      cy.getByData("confirmDeleteButton").click();
      cy.contains("Adminstrateur supprimer avec Succès.").should("be.exist");

      cy.get(".styles_container__82D-V > :nth-child(1)")
        .contains(adminData.phoneNumber)
        .should("not.exist");
    });
  });
});
