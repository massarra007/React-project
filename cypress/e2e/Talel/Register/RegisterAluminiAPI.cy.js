
describe("RegisterAluminie API", () => {
  let API_URL = Cypress.env("urlBackend") + "/student/";
  const uid = (Math.random(99)*100).toFixed(0);
 

  it("registers an aluminie successfully", () => {
    // Test data
    const data = {
      email: `${uid}-test-alumini@gmail.com`,
      password: "password123",
      firstName: "Alimini1",
      lastName: "test",
      phoneNumber: (Math.random(99)*100000000).toFixed(0),
      sex: "MEN",
      birthDate: "1990-01-01",
      promotion: "2022-2023",
      diplome: "LICENSE FONDA EN INFO",
    };

    cy.request({
      method: "POST",
      url: API_URL+"register_aluminie",
      body: data,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

    });
  });

  
  it("registers failure for existing user", () => {
    // Test data
    const data = {
      email: `${uid}-test-alumini@gmail.com`,
      password: "password123",
      firstName: "Alimini1",
      lastName: "test",
      phoneNumber: "1234567890",
      sex: "MEN",
      birthDate: "1990-01-01",
      promotion: "2022-2023",
      diplome: "LICENSE FONDA EN INFO",
    };

    cy.request({
      method: "POST",
      url: API_URL+"register_aluminie",
      body: data,
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the registration was successful
      expect(response.status).to.eq(409);
      //expect(response.body).to.have.property("success", true);

      // Check if success message is displayed
     // cy.contains("success register...").should("exist");
    });
  });

  it("handles registration failure for missing data", () => {
    // Test data
    const data = {
      email: `${uid}-test-alumini@gmail.com`,
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      sex: "MEN",
      birthDate: "1990-01-01",
      //body missing data
     /*  promotion: "2022-2023",
      diplome: "LICENSE FONDA EN INFO", */
    };

    cy.request({
      method: "POST",
      url: API_URL+"register_aluminie",
      body: data,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);

    });
  });
});
