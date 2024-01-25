describe("Register Component", () => {
    beforeEach(() => {
      cy.visit("/register"); // Assuming the register page is available at "/register"
    });
  
    it("should display validation errors for empty fields", () => {
      cy.get('form').submit(); // Submit the form without entering any data
  
      cy.contains("Vérifier champ.").should("exist"); // Check if the validation error for the "Nom" field is displayed
      cy.contains("Vérifier champ.").should("exist"); // Check if the validation error for the "Prenom" field is displayed
      cy.contains("Champ email vide.").should("exist"); // Check if the validation error for the "Email" field is displayed
      cy.contains("Numéro télephone vide.").should("exist"); // Check if the validation error for the "Numéro télephone" field is displayed
      cy.contains("Sélectionner Date Naissancee").should("exist"); // Check if the validation error for the "Date Naissancee" field is displayed
      cy.contains("Sélectionner diplome.").should("exist"); // Check if the validation error for the "Diplome" field is displayed
      cy.contains("Sélectionner promotion").should("exist"); // Check if the validation error for the "Promotion" field is displayed
    });
  
    it("should display validation error for invalid email format", () => {
      cy.get("#email").type("invalid_email"); // Enter an invalid email format
      cy.get('form').submit();
  
      cy.contains("Format email invalide").should("exist"); // Check if the validation error for the email format is displayed
    });
  
    it("should display validation error for password requirements", () => {
      cy.get("#password").type("pass"); // Enter a password that doesn't meet the requirements
      cy.get('form').submit();
  
      cy.contains("Taille min 8").should("exist"); // Check if the validation error for the password length is displayed
     /*  cy.contains("Mot de passe doit contenir des caractéres majuscules").should("exist"); // Check if the validation error for the uppercase characters is displayed
      cy.contains("Mot de passe doit contenir des caractéres miniscules").should("exist"); // Check if the validation error for the lowercase characters is displayed
      cy.contains("Mot de passe doit contenir des caractéres numériques").should("exist"); // Check if the validation error for the numeric characters is displayed
 */    });
  
    it("should register a new user on successful form submission", () => {
      cy.get("#firstName").type("John"); // Enter the first name
      cy.get("#lastName").type("Doe"); // Enter the last name
      cy.get("#email").type("john.test@example.com"); // Enter a valid email address
      cy.get("#password").type("Password123"); // Enter a password that meets the requirements
      cy.get("#Ntel").type("123456789"); // Enter the telephone number
      // Enter other required fields if necessary
      cy.get('[data-testid="diplome-field"]').click();
      cy.get('[data-value="LICENSE APPLIQUE EN INFO"]').click();

      cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root')
      .typeDateFormat("2014-01-02");
cy.get(":nth-child(8) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root")
.selectYearInDatePicker("2017");

      cy.get('form').submit(); // Submit the form
  
      // Add assertions here to verify the successful registration of the user
      // For example, you can assert that the user is redirected to the login page
      // by checking the current URL or checking for a success message on the page.
    });
  });
  