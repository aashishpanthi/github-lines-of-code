const getRepos = require("../utils/getRepos");
const getSha = require("../utils/getSha");
const getFiles = require("../utils/getFiles");
const getTotalLines = require("../utils/getTotalLines");
const request = require("../utils/request");

const getCardDetails = async (req, res) => {
  const { username } = req.params;

  //   const access_token = getAccessToken(username)
  const access_token = "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";

  const totalFiles = [];

  try {
    const repos = await getRepos(request, access_token);
    console.log("Repos:", repos.length);

    // go to every repository and fetch the code
    for (const repo of repos) {
      // get the sha from the commits
      try {
        const sha = await getSha(repo, request, access_token);

        if (sha) {
          // get the tree from the sha
          const files = await getFiles(
            `https://api.github.com/repos/${repo.name}/git/trees/${sha}`,
            request,
            access_token
          );

          // add the branch name to the files
          files.forEach((file) => {
            file.branch = repo.default_branch;
            file.private = repo.private;
          });

          console.log(`Total files of ${repo.name} are: ${files.length}`);
          totalFiles.push(...files);
        }

        console.log(`
    
            `);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("totalFiles: ", totalFiles.length);

    // calculate the lines of code { public, private}
    const {
      totalPrivateLines,
      totalPublicLines,
      totalPrivateSize,
      totalPublicSize,
      languageSize,
    } = await getTotalLines(totalFiles, request, access_token);

    console.log("Total lines of code: ", {
      totalPrivateLines,
      totalPublicLines,
      totalPrivateSize,
      totalPublicSize,
      languageSize,
    });
  } catch (error) {
    console.log(error);
  }

  res.send(totalFiles);
};

module.exports = getCardDetails;
