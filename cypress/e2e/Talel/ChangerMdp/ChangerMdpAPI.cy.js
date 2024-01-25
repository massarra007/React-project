describe("UpdatePassword API", () => {
    let API_URL = Cypress.env("urlBackend") + "/user/";
    let token;

    beforeEach(() => {
        cy.clearToken();
        cy.connect_as_alumini().then((resp) => (token = `Bearer ${resp}`));
    });
    it("should update the password successfully", () => {
      // Test data
      const data = {
        password: "50635155",
        confpassword: "50635155",
        oldpassword: "50635155",
      };
  
      cy.request({
        method: "PUT",
        url: API_URL + "change_pass",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  


  });
  