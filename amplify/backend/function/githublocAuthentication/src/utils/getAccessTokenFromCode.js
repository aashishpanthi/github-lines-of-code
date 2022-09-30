const queryString = require("query-string");

const getAccessTokenFromCode = async (code, request) => {
  const app_id = process.env.APP_ID;
  const app_secret = process.env.APP_SECRET;

  console.log(app_id, app_secret);

  const data = await request(
    "https://github.com/login/oauth/access_token",
    {
      client_id: app_id,
      client_secret: app_secret,
      code,
    },
    "post"
  );

  const parsedData = queryString.parse(data);
  console.log(parsedData);

  if (parsedData.error) throw new Error(parsedData.error_description);
  const { access_token } = parsedData;
  return access_token;
};

module.exports = getAccessTokenFromCode;
