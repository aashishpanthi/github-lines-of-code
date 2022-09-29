const getRepos = async (request, access_token) => {
  const response = await request(
    "https://api.github.com/user/repos",
    access_token
  );

  const repos = response.map((repo) => {
    return {
      name: repo.full_name,
      language: repo.language,
      private: repo.private,
      default_branch: repo.default_branch,
      trees_url: repo.trees_url,
    };
  });

  return repos;
};

module.exports = getRepos;
