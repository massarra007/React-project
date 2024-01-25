

  describe("RecruitmentScreen", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_aluminie();
    cy.visit("/dash/RecrutementForm");
      });
  

      
      it("should submit the form for temporary  with valid data", () => {
        // Fill in the form fields without adding any skills
        cy.getByData("selectType").click();
        cy.getByData('Temporary')
        .click();
        cy.getByData('compt').type("React js{enter} Node Js{enter} Cypress{enter}");
        cy.get("#description").type("Full Stack js expert applying for vacation");
      
        // Submit the form
        cy.get("form").submit();
      
        // Assert that the error message is displayed (replace with your own assertions)
      });
      it("should submit the form for Expert  with valid data", () => {
        // Fill in the form fields without adding any skills
        cy.getByData("selectType").click();
        cy.getByData('Expert')
        .click();
        cy.getByData('compt').type("React js{enter} Node Js{enter} Cypress{enter}");
        cy.get("#description").type("Full Stack js expert applying for expert contract");
      
        // Submit the form
        cy.get("form").submit();
      
        // Assert that the error message is displayed (replace with your own assertions)
      });
  });
  