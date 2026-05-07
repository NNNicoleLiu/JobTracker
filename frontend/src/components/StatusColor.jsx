const colors = {
  All: "#737373",
  Applied: "#b8d3ff",
  Interview: "#ffe5a0",
  Offer: "#93e3a9",
  Rejected: "#ffe3dc",
  Withdrawn: "#c4cad4",
};

export const setStatusColor = (status) => {
  return colors[status];
};
