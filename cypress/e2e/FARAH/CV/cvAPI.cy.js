/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CV API", () => {
  let token;
  let API_URL = Cypress.env("urlBackend") + "/cv/";
  let idStudent = "643817fdb7a1349c33a4849b";

  beforeEach(() => {
    cy.connect_as_teacher().then((resp) => (token = `Bearer ${resp}`));
    cy.fixture("teacher.json").then((data) => {});
  });
  it("Shold GET CV OF STUDENT ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}get_cv_by_id/${idStudent}`,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it("Shold NOT GET CV OF STUDENT ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}get_cv_by_id/5666665`,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(500);
    });
  });
});
