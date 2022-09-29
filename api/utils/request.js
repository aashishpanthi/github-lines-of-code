const axios = require("axios");

const request = async (url, options, method = "get") => {
  try {
    if (method == "post") {
      const { data } = await axios.post(url, options);

      console.log("post", data);
      return data;
    } else {
      const access_token = options;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });

      console.log("get", data);
      return data;
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = request;
