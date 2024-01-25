describe("CRUD EVENT", () => {
  let token;
  let savedPFA;
  let updatedPFA;
  let API_URL = Cypress.env("urlBackend") + "/project/";
  let pfaData;
  let pfaDataUpdated;

  it("Should Connect", () => {
    cy.fixture("pfa.json").then((data) => {
      pfaData = data.pfa;
    });

    cy.request({
      method: "POST",
      url: `${API_URL}create_pfa`,
      body: pfaData,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      console.log(resp);
      expect(resp.status).to.eq(401);
    });
  });

  describe("CRUD PFA WITH CONNEXION", () => {
    beforeEach(() => {
      cy.connect_as_teacher().then((resp) => {
        token = `Bearer ${resp}`;
        console.log(token);
      });
      cy.fixture("pfa.json").then((data) => {
        pfaData = data.pfa;
      });
      cy.fixture("pfa.json").then((data) => {
        pfaDataUpdated = data.pfaUpdated;
      });
    });

    it("Should Add Pfa", () => {
      console.log(token);
      cy.request({
        method: "POST",
        url: `${API_URL}create_pfa`,
        body: pfaData,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        console.log(resp.body.data);

        if (resp.status === 401) {
          // check if response is unauthorized
          // try to refresh token or generate a new one
          cy.connect_as_teacher().then((resp) => {
            console.log(resp); // log the response to debug
            token = `Bearer ${resp}`;
          });
        }

        expect(resp.status).to.eq(200);
        expect(resp.body.data.title).to.eq(pfaData.title);
        expect(resp.body.data.description).to.eq(pfaData.description);
        expect(resp.body.data.promotion).to.eq(pfaData.promotion);
        expect(resp.body.data.technologies).to.deep.eq(pfaData.technologies);

        expect(resp.body.data._id).to.exist;
        savedPFA = resp.body.data;
      });
    });

    it("Check If pfa Added Exist ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}get_pfa_teacher`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const pfas = response.body.data;
        const pfa = pfas.filter((t) => t._id === savedPFA._id);
        expect(pfa).to.exist;
      });
    });
    it("should update pfa", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}update_pfa`,
        body: {
          _id: savedPFA._id,
          title: "h2",
          description: "desc2",
          technologies: ["React", "Cron"],
          promotion: "2018-2019",
        },
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        expect(resp.body.data._id).to.exist;
        updatedPFA = resp.body.data;
      });
    });

    it("check if pfa is updated by id", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}get_pfa_id/${savedPFA._id}`,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.title).to.eq(updatedPFA.title);
        expect(resp.body.data.description).to.eq(updatedPFA.description);
        expect(resp.body.data.technologies).to.deep.eq(updatedPFA.technologies);
      });
    });

    it("Should Delete pfa Added", () => {
      cy.request({
        method: "DELETE",
        url: `${API_URL}delete_pfa/${savedPFA._id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Check If pfa Delected Succesfully ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}get_pfa_id/${savedPFA._id}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false, // to prevent Cypress from failing the test due to a 404 status code
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
