import { toast } from "react-hot-toast";

describe("Alumni Backend API Tests", () => {
    let API_URL = Cypress.env("urlBackend") + "/employement/";

  beforeEach(() => {
    // Add any necessary setup before each test
  });

  it("Should retrieve alumni statistics for critere pays", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAluminiStats/pays`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      expect(response.body).to.have.property("data");

      // Perform any necessary assertions on the response data
      const alumniStats = response.body.data;
      expect(alumniStats).to.be.an("array").and.to.have.length.gt(0);

      // Add your assertions here
      toast.success(response.body.Message);
    });
  });




  it("Should retrieve alumni statistics for critere societe", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAluminiStats/societe`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      expect(response.body).to.have.property("data");

      // Perform any necessary assertions on the response data
      const alumniStats = response.body.data;
      expect(alumniStats).to.be.an("array").and.to.have.length.gt(0);

      // Add your assertions here
      toast.success(response.body.Message);
    });
  });

  it(" getAluminiStats Should return 404 not found if not passed critere", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAluminiStats`,
      failOnStatusCode: false,

    }).then((response) => {
      expect(response.status).to.eq(404);
     
    });
  });

  it("Should retrieve alumni chommage statistics for critere promotion", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getStatChommage/promotion`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      expect(response.body).to.have.property("data");

      // Perform any necessary assertions on the response data
      const chommageStats = response.body.data;
      expect(chommageStats).to.be.an("array").and.to.have.length.gt(0);

      // Add your assertions here
      toast.success(response.body.Message);
    });
  });


  it("Should retrieve alumni chommage statistics for critere diplome", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getStatChommage/diplome`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Message");
      expect(response.body).to.have.property("data");

      // Perform any necessary assertions on the response data
      const chommageStats = response.body.data;
      expect(chommageStats).to.be.an("array").and.to.have.length.gt(0);

      // Add your assertions here
      toast.success(response.body.Message);
    });
  });


  it(" getAluminiStats Should return 404 not found if not passed critere", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getStatChommage`,
      failOnStatusCode: false,

    }).then((response) => {
      expect(response.status).to.eq(404);
     
    });
  });
});
