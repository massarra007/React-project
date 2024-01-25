/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("ACCOUNT API ", () => {
  let token;
  let API_URL_All = Cypress.env("urlBackend") + "/user/";
  let API_URL_STUDENT = Cypress.env("urlBackend") + "/student/";

  let savedaccount;

  beforeEach(() => {
    cy.connect_as_student().then((resp) => (token = `Bearer ${resp}`));
  });

  it("Get User Data", () => {
    cy.request({
      method: "GET",
      url: `${API_URL_All}get_user_by_token`,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.data).to.exist;
      savedaccount = resp.body.data;
    });
  });

  it("Should Update Profile To Public", () => {
    cy.request({
      method: "PUT",
      url: `${API_URL_All}pub_priv`,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.data.isPublic).to.eq(!savedaccount.isPublic);
      savedaccount = resp.body.data;
    });
  });

  it("Should Get All Public Account", () => {
    cy.request({
      method: "GET",
      url: `${API_URL_STUDENT}getallpublic`,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.data.allpublicStrudents).to.be.an("array").that.is.exist;
      expect(resp.body.data.allpublicAluminies).to.be.an("array").that.is.exist;
    });
  });
});
