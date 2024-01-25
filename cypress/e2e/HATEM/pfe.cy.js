/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD PFE", () => {
  let token;
  let savedPFE;
  let updatedPFE;
  let API_URL = Cypress.env("urlBackend") + "/project"; // /api/student/create
  let API_URL_All = Cypress.env("urlBackend") + "/user";
  let dataJson;
  let dataWithUpdate;

  it("Should Connect", () => {
    cy.fixture("pfe.json").then((data) => {
      dataJson = data.pfe;
      dataWithUpdate = data.update_pfe;
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

  describe("PFE BY STUDENT", () => {
    beforeEach(() => {
      cy.connect_as_student().then((resp) => (token = `Bearer ${resp}`));
      cy.fixture("pfe.json").then((data) => {
        dataJson = data.pfe;
      });
    });
    it("Should Add PFE", () => {
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
        expect(resp.body.data.title).to.eq(dataJson.title);
        expect(resp.body.data.description).to.eq(dataJson.description);
        expect(resp.body.data.technologies).to.deep.eq(dataJson.technologies);
        expect(resp.body.data.societe).to.eq(dataJson.societe);
        expect(resp.body.data.type).to.eq(dataJson.type);
        expect(resp.body.data.pays).to.eq(dataJson.pays);
        expect(resp.body.data.startDate).to.eq(dataJson.startDate);
        expect(resp.body.data.endDate).to.eq(dataJson.endDate);

        expect(resp.body.data._id).to.exist;
        savedPFE = resp.body.data;
      });
    });

    it("Check If pfe Added Exist ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/get_pfe_student`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const pfes = response.body.data;
        const pfe = pfes.filter((s) => s._id === savedPFE._id);
        expect(pfe).to.exist;
      });
    });

    it("add another pfe in same year => must not work : each student have only 1 by year  ", () => {
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

    it("should update PFE", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}/update`,
        body: { ...dataWithUpdate, _id: savedPFE._id },
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        expect(resp.body.data._id).to.exist;
        updatedPFE = resp.body.data;
      });
    });

    it("check if pfe is updated by id", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/get_pfe_id/${savedPFE._id}`,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.title).to.eq(dataWithUpdate.title);
        expect(resp.body.data.description).to.eq(dataWithUpdate.description);
        expect(resp.body.data.technologies).to.deep.eq(
          dataWithUpdate.technologies
        );
        expect(resp.body.data.societe).to.eq(dataWithUpdate.societe);
        expect(resp.body.data.type).to.eq(dataWithUpdate.type);
        expect(resp.body.data.pays).to.eq(dataWithUpdate.pays);
        expect(resp.body.data.startDate).to.eq(dataWithUpdate.startDate);
        expect(resp.body.data.endDate).to.eq(dataWithUpdate.endDate);
      });
    });

    it("Teacher Select PFE", () => {
      let teacher_token = "";
      cy.connect_as_teacher().then((resp) => {
        teacher_token = `Bearer ${resp}`;
        cy.request({
          method: "POST",
          url: `${API_URL}/approve_by_enseig/${savedPFE._id}`,
          headers: {
            Authorization: teacher_token,
          },
        }).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      });
    });

    it("Admin Approve PFE", () => {
      let admin_token = "";
      cy.connect_as_superadmin().then((resp) => {
        admin_token = `Bearer ${resp}`;
        cy.request({
          method: "POST",
          url: `${API_URL}/approve_by_admin/${savedPFE._id}`,
          body: { note: 14 },
          headers: {
            Authorization: admin_token,
          },
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.data.mention).to.eq("Bien");
        });
      });
    });

    it("Should Delete PFE Added", () => {
      cy.request({
        method: "DELETE",
        url: `${API_URL}/delete/${savedPFE._id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Check If pfe deleted or not ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}/get_pfe_id/${savedPFE._id}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(404);
      });
    });
  });
});
