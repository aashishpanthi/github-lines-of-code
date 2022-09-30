const axios = require("axios");

const request = async (url, options, method = "get") => {
  try {
    if (method == "post") {
      const { data } = await axios.post(url, options);

      return data;
    } else {
      const access_token = options;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `token ${access_token}`,
          "User-Agent": "github-lines-of-code",
        },
      });

      return data;
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = request;
