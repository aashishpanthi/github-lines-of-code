const getSha = async (repo, request, access_token) => {
  try {
    const data = await request(
      `https://api.github.com/repos/${repo.name}/commits`,
      access_token
    );

    if (data) {
      const { sha } = data[0].commit.tree;

      return sha;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getSha;
