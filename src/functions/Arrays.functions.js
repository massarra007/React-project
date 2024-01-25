export const have = (tab, x) => {
  return tab.indexOf(x) > -1;
};

export const GetOnly = (tab = [], obj = {}) => {
  let newObj = {};
  tab.forEach((element) => {
    newObj = { ...newObj, [element]: obj[element] };
  });
  return newObj;
};
