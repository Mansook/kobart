const { default: client } = require("../client");

export const selectCompany = ({ _id, company }) =>
  client.patch(`/article/api/users/select`, {
    _id: _id,
    company: company,
  });
