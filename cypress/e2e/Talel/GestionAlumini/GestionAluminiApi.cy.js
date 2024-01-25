import { toast } from "react-hot-toast";

describe("Alumni API Tests", () => {
    let API_URL = Cypress.env("urlBackend") + "/student/";
    let token;

  beforeEach(() => {
    cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));

    // Add any necessary setup before each test
  });

  it("Should get all alumni", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getall`,
      headers: {
        Authorization: token,
      },

    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("allpublicAluminies");
      // Perform any necessary assertions on the response data
      const alumni = response.body.data.allpublicAluminies;
      expect(alumni).to.be.an("array").and.to.have.length.gt(0);

      // Add your assertions here
    });
  });

  it("Should validate alumni inscription", () => {
    const idAlumini = "64621a0ce64d8334a7686272"; // Add the ID of the alumni to validate
    const validated = true; // Set the validation status

    cy.request({
      method: "PUT",
      url: `${API_URL}validateAlumini`,

      body: {
        idAlumini: idAlumini,
        validated: validated,
      },
      headers: {
        Authorization: token,
      },
      //failOnStatusCode: false, // to prevent Cypress from failing the test due to a 404 status code

    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      // Perform any necessary assertions on the response data
      toast.success(response.body.Message);
    });
  });
  it("Should refuse alumni inscription", () => {
    const idAlumini = "64621a0ce64d8334a7686272"; // Add the ID of the alumni to validate
    const validated = false; // Set the validation status

    cy.request({
      method: "PUT",
      url: `${API_URL}validateAlumini`,

      body: {
        idAlumini: idAlumini,
        validated: validated,
      },
      headers: {
        Authorization: token,
      },
      //failOnStatusCode: false, // to prevent Cypress from failing the test due to a 404 status code

    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      // Perform any necessary assertions on the response data
      toast.success(response.body.Message);
    });
  });
});
