describe("login as alumini", () => {

    beforeEach(() => {
        cy.clearToken();    
        cy.visit("login"); 
    });
    it("sigin in successfully as an aluminie waiting for validation", () => {
        cy.clearToken();
        cy.visit("/");
        cy.location("pathname").should("eq", "/login");
        cy.getByData("userName").type("99800397");
        cy.getByData("password").type("99800397");
        cy.getByData("connectButton").click();
//should display popup
cy.get('#customized-dialog-title').should("be.visible");

      });
    it("sigin in successfully as an aluminie validated already", () => {
        cy.clearToken();
        cy.visit("/");
        cy.location("pathname").should("eq", "/login");
        cy.getByData("userName").type("50635155");
        cy.getByData("password").type("50635155");
        cy.getByData("connectButton").click();
        cy.location("pathname").should("eq", "/dash/main");
        cy.window().then((win) => {
          const token = win.localStorage.getItem("isamm_token");
          expect(token).not.to.be.null;
        });
        cy.window().then((win) => {
          const token = win.localStorage.getItem("isamm_ref_token");
          expect(token).not.to.be.null;
        });
    
        cy.getUserByToken().then((response) => {
          const user = response.body.data;
          console.log(response);
          expect(user.role).to.be.eq("ALUMINIE");
        });
      });

});