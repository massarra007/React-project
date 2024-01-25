export const makeDate = (str) => {
  let date = new Date(str);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export const makeDate2 = (str) => {
  let date = new Date(str);
  let year = date.getFullYear();
  let month = date.getMonth() < 9 ? "0" + date.getMonth() : date.getMonth();
  let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  return `${year}-${month}-${day}`;
};

export const makeDate3 = (str) => {
  let date = new Date(str);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
