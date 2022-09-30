const getTree = async (url, request, access_token) => {
  const data = await request(url, access_token);

  return data.tree;
};

module.exports = getTree;
