/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD responsible", () => {
  let token;
  let savedresponsible;
  let API_URL = Cypress.env("urlBackend") + "/teacher/";
  let API_URL_All = Cypress.env("urlBackend") + "/user/";

  let dataJson;

  beforeEach(() => {
    cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));
    cy.fixture("teacher.json").then((data) => {
      dataJson = data.responsible;
    });
  });
  it("Should Add  user with role responsible", () => {
    cy.request({
      method: "POST",
      url: `${API_URL}createTeacherResponsible`,
      body: dataJson,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      console.log(resp.body.data);

      expect(resp.status).to.eq(200);
      expect(resp.body.data.firstName).to.eq(dataJson.firstName);
      expect(resp.body.data.lastName).to.eq(dataJson.lastName);
      expect(resp.body.data.birthDate).to.eq(dataJson.birthDate);
      expect(resp.body.data.phoneNumber).to.eq(dataJson.phoneNumber);
      expect(resp.body.data.sex).to.eq(dataJson.sex);
      expect(resp.body.data.email).to.eq(dataJson.email);
      expect(resp.body.data.course).to.deep.eq(dataJson.course);
      expect(resp.body.data._id).to.exist;
      expect(resp.body.data.role).to.eq("RESPONSIBLE");

      savedresponsible = resp.body.data;
    });
  });

  it("Check If responsible Added Exist ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}get_all`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responsibles = response.body.data;
      const responsible = responsibles.filter(
        (t) => t._id === savedresponsible._id
      );
      expect(responsible).to.exist;
    });
  });

  it("Should Delete Responsible Added", () => {
    cy.request({
      method: "DELETE",
      url: `${API_URL_All}delete/${savedresponsible._id}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
