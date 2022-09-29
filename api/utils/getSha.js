const getSha = async (repo, request, access_token) => {
  const data = await request(
    `https://api.github.com/repos/${repo.name}/commits`,
    access_token
  );
  console.log(data);

  const { sha } = data[0].commit.tree;

  return sha;
};

module.exports = getSha;
