// create a function and export it cjs
const request = require("./utils/request");
const getAccessTokenFromCode = require("./utils/getAccessTokenFromCode");
const getUserData = require("./utils/getUserData");

const authorize = async (req, res) => {
  const code = req.query.code;

  const access_token = await getAccessTokenFromCode(code, request);

  const user = await getUserData(access_token, request);
  console.log("user", user);
};

module.exports = authorize;
