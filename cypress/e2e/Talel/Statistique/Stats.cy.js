describe("StatsComponent", () => {
  beforeEach(() => {
    cy.clearToken();
    cy.connect_as_superadmin();

    // Mock the necessary API requests/responses using cy.intercept or cy.route as needed
    // Make sure the component is rendered with the necessary data for testing
    // Visit the page containing the StatsComponent

    cy.visit("/dash/statAlumini");
  });

  it("displays Alumni Statistics", () => {
    cy.contains("Alumni Statistics").should("be.visible");
  });

  it("displays Chommage Statistics", () => {
    cy.contains("Chommage Statistics").should("be.visible");
  });

  it("changes critere value for Alumni Statistics", () => {
    cy.get("select[data-cy='critere-select']").select("societe");
    cy.get("select[data-cy='critere-select']").should("have.value", "societe");
  });

  it("renders the StatsComponent", () => {
    cy.location("pathname").should("eq", "/dash/statAlumini");
    cy.contains("Alumni Statistics").should("be.visible");
  });

  it("changes critereCh value for Chommage Statistics", () => {
    cy.get("select[data-cy='critereCh-select']").select("diplome");
    cy.get("select[data-cy='critereCh-select']").should("have.value", "diplome");
  });

  it("renders chart for Chommage Statistics", () => {
    // Mock the API response for fetching chommage statistics
    // Ensure the chart component is rendered with the expected data
    cy.get("[data-test='chommageChart']").should("be.visible");
  });
});
