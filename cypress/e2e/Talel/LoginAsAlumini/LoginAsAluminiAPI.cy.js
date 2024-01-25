import { Alert } from "@mui/material";

describe("API Test - Login Service", () => {
    let API_URL = Cypress.env("urlBackend") + "/user/";

    beforeEach(() => {
        cy.clearToken();
    });
    it("Should login successfully VALID ALUMINI valid credentials", () => {
      cy.request({
        method: "POST",
        url: API_URL+"login",
        body: {
          // Provide valid login credentials here
          userName: "50635155",
          password: "50635155",
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
      //  alert(JSON.stringify(response.body.data.user))
        expect(response.body.data.user.role).to.eq("ALUMINIE");

      });
    });
});