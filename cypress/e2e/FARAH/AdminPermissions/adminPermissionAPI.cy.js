/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
describe("CRUD ADMINS", () => {
  let token;
  let savedadmin;
  let updatedadmin;
  let API_URL = Cypress.env("urlBackend") + "/admin/";
  let API_URL_ALL = Cypress.env("urlBackend") + "/user/";
  let adminData;
  let adminDataUpdated;

  beforeEach(() => {
    cy.connect_as_superadmin().then((resp) => (token = `Bearer ${resp}`));
    cy.fixture("admin.json").then((data) => {
      adminData = data.admin;
    });
    cy.fixture("admin.json").then((data) => {
      adminDataUpdated = data.adminUpdated;
    });
  });
  it("Should Add ADMIN", () => {
    cy.request({
      method: "POST",
      url: `${API_URL}create`,
      body: adminData,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      console.log(resp.body.data);

      expect(resp.status).to.eq(200);
      expect(resp.body.data.firstName).to.eq(adminData.firstName);
      expect(resp.body.data.lastName).to.eq(adminData.lastName);
      expect(resp.body.data.birthDate).to.eq(adminData.birthDate);
      expect(resp.body.data.phoneNumber).to.eq(adminData.phoneNumber);
      expect(resp.body.data.sex).to.eq(adminData.sex);
      expect(resp.body.data.email).to.eq(adminData.email);
      expect(resp.body.data.permessions).to.deep.eq(adminData.permessions);
      expect(resp.body.data._id).to.exist;
      savedadmin = resp.body.data;
    });
  });

  it("Check If admin Added Exist ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAll`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const admins = response.body.data;
      const admin = admins.filter((t) => t._id === savedadmin._id);
      expect(admin).to.exist;
    });
  });

  it("should update admin", () => {
    cy.request({
      method: "PUT",
      url: `${API_URL}update_permissions/${savedadmin._id}`,
      body: adminDataUpdated,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);

      expect(resp.body.data._id).to.exist;
      updatedadmin = resp.body.data;
    });
  });
  it("check if permission is updated by id", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAll`,
      headers: {
        Authorization: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const admins = resp.body.data;
      const admin = admins.find((t) => t._id === savedadmin._id);
      expect(admin).to.exist;

      expect(admin.permessions).to.deep.eq(adminDataUpdated.permessions);
    });
  });

  it("Should Delete admin Added", () => {
    cy.request({
      method: "DELETE",
      url: `${API_URL_ALL}delete/${savedadmin._id}`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Check If admin Delected Succesfully ", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}getAll`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      const admins = response.body.data;
      const admin = admins.find((t) => t._id === savedadmin._id);
      expect(admin).to.not.exist;
    });
  });
});
