describe("Change Password Page", () => {

    beforeEach(() => {
        cy.clearToken();
        cy.connect_as_alumini();
    
        cy.visit("dash/ChangerPwd"); // Adjust the URL as per your application
    });
  
    it("should toggle the checkbox", () => {
        // Check the checkbox
        cy.get("input[type='checkbox']").check();
      
        // Assert that the checkbox is checked
        cy.get("input[type='checkbox']").should("be.checked");
      
        // Uncheck the checkbox
        cy.get("input[type='checkbox']").uncheck();
      
        // Assert that the checkbox is unchecked
        cy.get("input[type='checkbox']").should("not.be.checked");
      });
      it("wrong old password should display error  ", () => {
        const oldPassword = "5063515false";
        const newPassword = "50635155";
        cy.get("input[name='oldPwd']").type(oldPassword);
        cy.get("input[name='NewPwd']").type(newPassword);
        cy.get("input[name='confNewPwd']").type(newPassword);
      
        // Submit the form
        cy.get("form").submit();
        cy.contains("something went wrong...", { timeout: 10000 }).should("be.visible");


      });

      it("should toggle the checkbox", () => {
        // Check the checkbox
        cy.get("input[type='checkbox']").check();
      
        // Assert that the checkbox is checked
        cy.get("input[type='checkbox']").should("be.checked");
      
        // Uncheck the checkbox
        cy.get("input[type='checkbox']").uncheck();
      
        // Assert that the checkbox is unchecked
        cy.get("input[type='checkbox']").should("not.be.checked");
      });
      it("'Nouveau mot de passe' and 'Confirmer nouveau mot de passe' diffrent values should display error ", () => {
        const newPassword = "50635155";
        cy.get("#NewPwd").type(newPassword);
        cy.get("#confNewPwd").type(newPassword+"1");
      
        // Submit the form
        cy.get("form").submit();
        cy.contains("Verify password confirmation...", { timeout: 10000 }).should("be.visible");


      });

    it("should update password successfully", () => {
      const oldPassword = "50635155";
      const newPassword = "50635155";
      
      // Fill out the form
      cy.get("input[type='checkbox']").check();

      cy.get("input[name='oldPwd']").type(oldPassword);
      cy.get("input[name='NewPwd']").type(newPassword);
      cy.get("input[name='confNewPwd']").type(newPassword);

      // Submit the form
      cy.get("form").submit();
      cy.contains("updated sucessfully...", { timeout: 10000 }).should("be.visible");
      cy.url().should("include", "/login");


      // Assert the success message or behavior after password update
      // For example, you can assert if the user is logged out or any other expected behavior
      // You can add assertions based on your application's behavior
    });
  
    // Add more test cases as needed
  
  });
  