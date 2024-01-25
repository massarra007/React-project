/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD EVENT", () => {
  let token;
  let savedEvent;
  let updatedEvent;
  let API_URL = Cypress.env("urlBackend") + "/event/";
  let eventData;
  let eventDataUpdated;

  it("Should Connect ", () => {
    cy.fixture("event.json").then((data) => {
      eventData = data.event;
    });

    cy.request({
      method: "POST",
      url: `${API_URL}create`,
      body: eventData,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    }).then((resp) => {
      console.log(resp);
      expect(resp.status).to.eq(401);
    });
  });

  describe("CRUD EVENT WITH CONNEXION AS SUPERADMIN", () => {
    beforeEach(() => {
      cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));
      cy.fixture("event.json").then((data) => {
        eventData = data.event;
      });
      cy.fixture("event.json").then((data) => {
        eventDataUpdated = data.eventUpdated;
      });
    });
    it("Should Add Event", () => {
      cy.request({
        method: "POST",
        url: `${API_URL}create`,
        body: eventData,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        console.log(resp.body.data);

        expect(resp.status).to.eq(200);
        expect(resp.body.data.eventName).to.eq(eventData.eventName);
        expect(resp.body.data.eventDateDebut).to.eq(eventData.eventDateDebut);
        expect(resp.body.data.eventType).to.eq(eventData.eventType);
        expect(resp.body.data.description).to.eq(eventData.description);
        expect(resp.body.data.description).to.eq(eventData.description);
        expect(resp.body.data.location).to.eq(eventData.location);
        expect(resp.body.data._id).to.exist;
        savedEvent = resp.body.data;
      });
    });

    it("Check If Event Added Exist ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getAll`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const events = response.body.data;
        const event = events.filter((t) => t._id === savedEvent._id);
        expect(event).to.exist;
      });
    });

    it("should update event", () => {
      cy.request({
        method: "PUT",
        url: `${API_URL}update/${savedEvent._id}`,
        body: eventDataUpdated,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        expect(resp.body.data._id).to.exist;
        updatedEvent = resp.body.data;
      });
    });
    it("check if task is updated by id", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getOne/${savedEvent._id}`,
        headers: {
          Authorization: token,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.eventName).to.eq(updatedEvent.eventName);
        expect(resp.body.data.eventDateDebut).to.eq(
          updatedEvent.eventDateDebut
        );
        expect(resp.body.data.eventType).to.eq(updatedEvent.eventType);
        expect(resp.body.data.description).to.eq(updatedEvent.description);
        expect(resp.body.data.description).to.eq(updatedEvent.description);
        expect(resp.body.data.location).to.eq(updatedEvent.location);
      });
    });

    it("Should Delete Event Added", () => {
      cy.request({
        method: "DELETE",
        url: `${API_URL}delete/${savedEvent._id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Check If Event Delected Succesfully ", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getOne/${savedEvent._id}`,
        headers: {
          Authorization: token,
        },
        failOnStatusCode: false, // to prevent Cypress from failing the test due to a 404 status code
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  describe("GET ALL EVENT WITH CONNEXION AS STUDENT", () => {
    before(() => {
      cy.connect_as_student().then((resp) => (token = `Bearer ${resp}`));
    });
    it("GET ALL EVENT", () => {
      cy.request({
        method: "GET",
        url: `${API_URL}getAll`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an("array").to.exist;
      });
    });
  });
});
