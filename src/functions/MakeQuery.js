export const MakeQuery = (query) => {
  return {
    params: {
      ...query,
    },
  };
};

export const EleminateNull = (filter) => {
  let query = {};

  Object.keys(filter).forEach((param) => {
    if (filter[param] !== "None") {
      query = { ...query, [param]: filter[param] };
    }
  });
  return query;
};
