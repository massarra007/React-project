/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe("teacher Script", () => {
  let teacherData;
  let updatedteacher;

  describe("CONNECT AS SUPERADMIN", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.fixture("teacher.json").then((data) => {
        teacherData = data.teacher;
        updatedteacher = data.teacherUpdated;
      });
      cy.visit("/dash/GestionDesEnseignants");
    });

    it("displays a list of  teachers", () => {
      cy.wait(1000);
      cy.getByData("table").should("have.length.gte", 1);
    });
    it("Add teacher Successfully", () => {
      cy.getByData("addTeacherButton").click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("firstName").type(teacherData.firstName);
      cy.getByName("lastName").type(teacherData.lastName);
      cy.getByName("phoneNumber").type(teacherData.phoneNumber);
      cy.getByName("birthDate").typeDate(teacherData.birthDate);
      cy.getByName("email").type(teacherData.email);
      cy.get("#genre-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      cy.get("#course-select").click();
      cy.get("#course-select-option-1").click();
      cy.get("#course-select-option-0").click();

      cy.getByData("buttonAddteacher").click();
      cy.contains("Enseignant Ajouter avec Succès.").should("be.exist");
      cy.getByData("modal").should("not.exist");
    });
    it("Check if  teacher added in the table  Successfully", () => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(4)
        .then((phoneNumberCell) => {
          expect(phoneNumberCell.text()).to.eq(teacherData.phoneNumber);
        });
    });

    it("Add teacher Already Exist With Same email ", () => {
      cy.getByData("addTeacherButton").click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("firstName").type(teacherData.firstName);
      cy.getByName("lastName").type(teacherData.lastName);
      cy.getByName("phoneNumber").type(teacherData.phoneNumber);
      cy.getByName("birthDate").typeDate(teacherData.birthDate);
      cy.getByName("email").type(teacherData.email);
      cy.get("#genre-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      cy.get("#course-select").click();
      cy.get("#course-select-option-1").click();
      cy.get("#course-select-option-0").click();
      cy.getByData("buttonAddteacher").click();
      cy.wait(1000);
      cy.getByData("modal").should("be.exist");
      cy.getByData("modal").should("contain", "Email déja existe");
    });
    it("Update Teacher", () => {
      cy.get(`[data-test="updateButton-${teacherData.phoneNumber}"]`).click();
      cy.getByName("lastName").clear().type(updatedteacher.lastName);
      cy.getByData("buttonEditTeacher").click();
      cy.contains("Enseignant modifier avec Succès.").should("be.visible");
      cy.getByData("modal").should("not.exist");
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(2)
        .then((lastNameCell) => {
          expect(lastNameCell.text()).to.contain(updatedteacher.lastName);
        });
    });
  });

  describe("CONNECT AS TEACHER ", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_with_actual_data(teacherData.phoneNumber);
    });
    it("Check If Teacher Can connect", () => {
      cy.visit("/dash/main");
      cy.get(".styles_h1__c364M").contains("Home");
    });
  });

  describe("CONNECT AS SUPERADMIN  ", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.fixture("teacher.json").then((data) => {
        teacherData = data.teacher;
        updatedteacher = data.teacherUpdated;
      });
      cy.visit("/dash/GestionDesEnseignants");
    });

    it("Delete Teacher Successfully", () => {
      cy.get(`[data-test="deleteButton-${teacherData.phoneNumber}"]`).click();
      cy.wait(1000);
      //  cy.getByData("modal").should("be.visible");
      cy.getByData("confirmDeleteButton").click();
      cy.contains("Enseignant supprimer avec Succès.").should("be.exist");

      cy.get(".styles_container__82D-V > :nth-child(1)")
        .contains(teacherData.phoneNumber)
        .should("not.exist");
    });
  });
});
