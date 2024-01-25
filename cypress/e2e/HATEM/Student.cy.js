/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD Student", () => {
  let token;
  let savedStudent;
  let updatedStudent;
  let API_URL = Cypress.env("urlBackend") + "/student"; // /api/student/create
  let API_URL_All = Cypress.env("urlBackend") + "/user";
  let dataJson;
  let dataWithUpdate;

  it("Should Connect", () => {
    cy.fixture("student.json").then((data) => {
      dataJson = data.student;
    });

    cy.request({
      method: "POST",
      url: `${API_URL}/create`,
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

  describe("CRUD student WITH CONNEXION", () => {
    beforeEach(() => {
      cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));
      cy.fixture("student.json").then((data) => {
        dataJson = data.student;
        dataWithUpdate = data.studentUpdated;
      });
    });
    it("Should Add student", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}/create`,
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
        expect(resp.body.data.classe).to.eq(dataJson.classe);
        expect(resp.body.data.niveau).to.eq(dataJson.niveau);
        expect(Number(resp.body.data.numero_classe)).to.eq(
          Number(dataJson.numero_classe)
        );
        expect(resp.body.data.promotion).to.eq(dataJson.promotion);
        expect(resp.body.data._id).to.exist;
        savedStudent = resp.body.data;
      });
    });

    it("Check If student Added Exist ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/getall`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const { allpublicAluminies, allpublicStrudents } = response.body.data;
        const students = [...allpublicStrudents, ...allpublicAluminies];
        const student = students.filter((s) => s._id === savedStudent._id);
        expect(student).to.exist;
      });
    });
    it(" add same student --> should show 409   ", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}/create`,
        body: dataJson,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(409);
      });
    });
    it("should update student", () => {
      cy.request({
        method: "PUT",
        url: `${API_URL}/update_student/${savedStudent._id}`,
        body: dataWithUpdate,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        expect(resp.body.data._id).to.exist;
        updatedStudent = resp.body.data;
      });
    });
    it("check if task is updated by id", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/get_one/${savedStudent._id}`,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.firstName).to.eq(dataWithUpdate.firstName);
        expect(resp.body.data.lastName).to.eq(dataWithUpdate.lastName);
        expect(resp.body.data.birthDate).to.eq(dataWithUpdate.birthDate);
        expect(resp.body.data.phoneNumber).to.eq(dataWithUpdate.phoneNumber);
        expect(resp.body.data.sex).to.eq(dataWithUpdate.sex);
        expect(resp.body.data.email).to.eq(dataWithUpdate.email);
        expect(resp.body.data.classe).to.eq(dataWithUpdate.classe);
        expect(resp.body.data.niveau).to.eq(dataWithUpdate.niveau);
        expect(Number(resp.body.data.numero_classe)).to.eq(
          Number(dataWithUpdate.numero_classe)
        );
        expect(resp.body.data.promotion).to.eq(dataWithUpdate.promotion);
      });
    });

    it("Should Delete student Added", () => {
      cy.request({
        method: "DELETE",
        url: `${API_URL_All}/delete/${savedStudent._id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Check If student Delected Succesfully ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/get_one/${savedStudent._id}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false, // to prstudent Cypress from failing the test due to a 404 status code
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
