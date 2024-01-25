describe("Get CV", () => {
  let API_URL = Cypress.env("urlBackend") + "/cv/";
  let token;
  beforeEach(() => {
    cy.connect_as_student().then((resp) => {
      token = `Bearer ${resp}`;
      console.log(token);
    });
  });

  it("Check If cv Exist ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}get_cv_by_user`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const cv = response.body.data;
      expect(cv).to.exist;
    });
  });
});
