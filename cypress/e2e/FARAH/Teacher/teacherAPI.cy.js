/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD teacher", () => {
  let token;
  let savedteacher;
  let updatedteacher;
  let API_URL = Cypress.env("urlBackend") + "/teacher/";
  let API_URL_All = Cypress.env("urlBackend") + "/user/";
  let dataJson;
  let dataWithUpdate;

  it("Should Connect", () => {
    cy.fixture("teacher.json").then((data) => {
      dataJson = data.teacher;
    });

    cy.request({
      method: "POST",
      url: `${API_URL}createTeacher`,
      body: dataJson,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      console.log(resp);
      expect(resp.status).to.eq(401);
    });
  });

  describe("CRUD teacher WITH CONNEXION", () => {
    beforeEach(() => {
      cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));
      cy.fixture("teacher.json").then((data) => {
        dataJson = data.teacher;
        dataWithUpdate = data.teacherUpdated;
      });
    });
    it("Should Add teacher", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}createTeacher`,
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
        savedteacher = resp.body.data;
      });
    });

    it("Check If teacher Added Exist ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}get_all`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const teachers = response.body.data;
        const teacher = teachers.filter((t) => t._id === savedteacher._id);
        expect(teacher).to.exist;
      });
    });
    it(" add same teachear --> should show 409   ", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}createTeacher`,
        body: dataJson,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(409);
      });
    });
    it("should update teacher", () => {
      cy.request({
        method: "PUT",
        url: `${API_URL}update_info/${savedteacher._id}`,
        body: dataWithUpdate,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        expect(resp.body.data._id).to.exist;
        updatedteacher = resp.body.data;
      });
    });
    it("check if task is updated by id", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getOne/${savedteacher._id}`,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.firstName).to.eq(updatedteacher.firstName);
        expect(resp.body.data.lastName).to.eq(updatedteacher.lastName);
        expect(resp.body.data.birthDate).to.eq(updatedteacher.birthDate);
        expect(resp.body.data.phoneNumber).to.eq(updatedteacher.phoneNumber);
        expect(resp.body.data.sex).to.eq(updatedteacher.sex);
        expect(resp.body.data.email).to.eq(updatedteacher.email);
        expect(resp.body.data.course).to.deep.eq(updatedteacher.course);
      });
    });

    it("Should Delete teacher Added", () => {
      cy.request({
        method: "DELETE",
        url: `${API_URL_All}delete/${savedteacher._id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Check If teacher Delected Succesfully ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getOne/${savedteacher._id}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false, // to prteacher Cypress from failing the test due to a 404 status code
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
