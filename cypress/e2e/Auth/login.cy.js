/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("login page", () => {
  it("sigin in successfully as admin", () => {
    cy.clearToken();
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.getByData("userName").type("27893540");
    cy.getByData("password").type("27893540");
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
      expect(user.role).to.be.eq("ADMIN");
    });
  });

  it("sigin in successfully as superAdmin", () => {
    cy.clearToken();
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.getByData("userName").type("58217520");
    cy.getByData("password").type("58217520");
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
      expect(user.role).to.be.eq("SUPERADMIN");
    });
  });

  it("sigin in successfully as teacher", () => {
    cy.clearToken();
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.getByData("userName").type("99800937");
    cy.getByData("password").type("99800937");
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
      expect(user.role).to.be.eq("TEACHER");
    });
  });

  it("sigin in successfully as student", () => {
    cy.clearToken();
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.getByData("userName").type("58217529");
    cy.getByData("password").type("58217529");
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
      expect(user.role).to.be.eq("STUDENT");
    });
  });

  it("gets the user information by token", () => {
    cy.clearToken();
    cy.connect_as_superadmin().then((token) => {
      cy.wrap(token).should("not.be.null");
      cy.request({
        method: "GET",
        url: Cypress.env("urlBackend") + "/user/get_user_by_token",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("isamm_token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).not.to.be.null;
      });
    });
  });
});
