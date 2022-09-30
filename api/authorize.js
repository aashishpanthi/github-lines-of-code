// create a function and export it cjs
const request = require("./utils/request");
const getAccessTokenFromCode = require("./utils/getAccessTokenFromCode");
const getUserData = require("./utils/getUserData");
const getRepos = require("./utils/getRepos");
const getSha = require("./utils/getSha");
const getFiles = require("./utils/getFiles");

const authorize = async (req, res) => {
  const code = req.query.code;

  const access_token = await getAccessTokenFromCode(code, request);

  const totalFiles = [];

  //   const user = await getUserData(access_token, request);
  //   console.log("user", user);

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

          console.log(`Total files of ${repo.name} are: ${files.length}`);
          totalFiles.push(...files);
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log("I am running first");
    console.log("totalFiles: ", totalFiles);
  } catch (error) {
    console.log(error);
  }

  // calculate the lines of code {total, public, private}

  // Split the string on \n or \r characters
  // const separateLines = data.split(/\r?\n|\r|\n/g);

  // alert("Total number of separate lines is: " + separateLines.length);

  // take the sum of all lines of code

  //   res.send("wait");
  res.send(totalFiles);
};

module.exports = authorize;
