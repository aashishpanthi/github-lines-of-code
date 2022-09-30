const getUserData = async (access_token, request) => {
  const response = await request("https://api.github.com/user", access_token);

  const user = {
    id: response.id,
    type: response.type,
    login: response.login,
    avatar_url: response.avatar_url,
  };

  return user;
};

module.exports = getUserData;
