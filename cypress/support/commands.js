/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

/**********************    LOGIN COMMANDS *******************/
import { format } from "date-fns";

Cypress.Commands.add("connect_with_phone", (phone) => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: phone,
      password: phone,
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_superadmin", () => {
  cy.clearToken();
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "58217520",
      password: "58217520",
    },
  }).then((resp) => {
    console.log(resp.body.data.token);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_alumini", () => {
  cy.clearToken();
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "50635155",
      password: "50635155",
    },
  }).then((resp) => {
    console.log(resp.body.data.token);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_admin", () => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "27893540",
      password: "27893540",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_teacher", () => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "99800937",
      password: "99800937",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_student", () => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "58217529",
      password: "58217529",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_as_student_diplomed", () => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "11223344",
      password: "11223344",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
  });
});

Cypress.Commands.add("connect_as_aluminie", () => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: "50635155",
      password: "50635155",
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

Cypress.Commands.add("connect_with_actual_data", (data) => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlBackend") + "/user/login",
    body: {
      userName: data,
      password: data,
    },
  }).then((resp) => {
    console.log(resp);
    window.localStorage.setItem("isamm_token", resp.body.data.token);
    window.localStorage.setItem("isamm_ref_token", resp.body.data.refreshToken);
    return resp.body.data.token;
  });
});

/**********************    OTHER COMMANDS *******************/

Cypress.Commands.add("clearToken", () => {
  window.localStorage.removeItem("isamm_token");
  window.localStorage.removeItem("isamm_ref_token");
});
Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});
Cypress.Commands.add("getByName", (selector) => {
  return cy.get(`[name=${selector}]`);
});
Cypress.Commands.add("getUserByToken", () => {
  cy.request({
    method: "GET",
    url: Cypress.env("urlBackend") + "/user/get_user_by_token",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("isamm_token")}`,
    },
  }).then((response) => {
    console.log(response);
    return response.data;
  });
});

Cypress.Commands.add(
  "typeDate",
  { prevSubject: "element" },
  (subject, date) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    cy.wrap(subject).type(formattedDate);
  }
);


Cypress.Commands.add("typeDateFormat", 
/* { prevSubject: "element" }, (subject, date) => {
  const formattedDate = Cypress.moment(date).format("DD/MM/YYYY");
  cy.wrap(subject).type(formattedDate);
} */
{ prevSubject: "element" },
  (subject, date) => {
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    cy.wrap(subject).type(formattedDate);
  }


);

Cypress.Commands.add("selectYearInDatePicker", { prevSubject: "element" }, (subject, year) => {
  cy.wrap(subject).click(); // Click on the date picker to open it
  cy.get(".MuiYearCalendar-root").contains(year).click(); // Find and click the desired year
});


