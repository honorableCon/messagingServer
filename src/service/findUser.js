const mongodb = require("../config/mongodb");

module.exports = async function findUser(email) {
  const user = await mongodb().collection("messages").findOne(email);

  if (user) {
    return user;
  }
  return null;
};
