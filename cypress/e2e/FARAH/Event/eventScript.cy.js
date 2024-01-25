/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe("Event Script", () => {
  let eventData;
  describe("CONNECT AS SUPERADMIN", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.fixture("event.json").then((data) => {
        eventData = data.event;
      });
      cy.visit("/dash/GestionDesEvenement");
    });

    it("displays a list of events", () => {
      cy.getByData("table").should("have.length.gte", 1);
    });
    it("Add Event Successfully", () => {
      cy.getByData("addEventButton").click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("eventName").type(eventData.eventName);
      cy.get("#type-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      cy.getByName("eventDateDebut").typeDate(eventData.eventDateDebut);
      cy.getByName("eventDateFin").typeDate(eventData.eventDateFin);
      cy.getByName("location").type(eventData.location);
      cy.getByName("duration").type(eventData.duration);
      cy.getByName("organizedBy").type(eventData.organizedBy);
      cy.getByData("dd").type(eventData.description);
      cy.getByData("buttonAddEvent").click();
      cy.contains("Evénement Ajouter avec Succès.").should("be.exist");
    });
    it("Check if  Event added in the table  Successfully", () => {
      cy.getByData("table").should("contain", eventData.eventName);
    });

    it("Add Event Already Exist", () => {
      cy.getByData("addEventButton").click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("eventName").type(eventData.eventName);
      cy.get("#type-select").click();
      cy.get('.MuiList-root > [tabindex="0"]').click();
      cy.getByName("eventDateDebut").typeDate(eventData.eventDateDebut);
      cy.getByName("eventDateFin").typeDate(eventData.eventDateFin);
      cy.getByName("location").type(eventData.location);
      cy.getByName("duration").type(eventData.duration);
      cy.getByName("organizedBy").type(eventData.organizedBy);
      cy.getByData("dd").type(eventData.description);
      cy.getByData("buttonAddEvent").click();
      cy.wait(1000);
      cy.contains("Evénement déjà existe");
      cy.getByData("modal").should("be.exist");
    });
    it("Update Event Successfully", () => {
      cy.getByData("table").should("contain", eventData.location);
      cy.get(`[data-test="updateButton-${eventData.eventName}"]`).click();
      cy.getByData("modal").should("be.visible");
      cy.getByName("location").type("Tunis, Cite Jardin");
      cy.getByData("confirmUpdateButton").click();
      cy.wait(1000);
      cy.contains("Evénement modifier avec Succès.").should("be.visible");
      cy.getByData("table").should("contain", "Tunis, Cite Jardin");
      cy.getByData("modal").should("not.exist");
    });
    it("View Details Event ", () => {
      cy.getByData("table").should("contain", eventData.location);
      cy.get(`[data-test="viewButton-${eventData.eventName}"]`).click();
      cy.location("pathname").should("contain", "/GestionDesEvenement/details");
      cy.contains(eventData.eventName).should("be.visible");
    });
  });
  describe("CONNECT AS STUDENT", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_student();
      cy.visit("/dash/main");
    });

    it("should displays a list of events in dashboard", () => {
      cy.getByData("swiper").should("exist");
      cy.contains(".swiper-slide", eventData.eventName).should("exist");
    });
    it("should see details event", () => {
      cy.contains(".swiper-slide", eventData.eventName).click();
      cy.location("pathname").should("contains", "/dash/event");
      cy.contains(eventData.eventName).should("be.visible");
    });
  });

  describe("CONNECT AS SUPERADMIN ", () => {
    beforeEach(() => {
      cy.clearToken();
      cy.connect_as_superadmin();
      cy.fixture("event.json").then((data) => {
        eventData = data.event;
      });
      cy.visit("/dash/GestionDesEvenement");
    });

    it("Delete Event Successfully", () => {
      cy.contains(eventData.eventName).should("exist");
      cy.get(`[data-test="deleteButton-${eventData.eventName}"]`).click();
      //cy.getByData("modal").should("be.visible");
      cy.getByData("confirmDeleteButton").click();

      cy.get(".styles_container__82D-V > :nth-child(1)")
        .contains(eventData.eventName)
        .should("not.exist");
    });
  });
});
