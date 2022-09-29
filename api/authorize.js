// create a function and export it cjs
const request = require("./utils/request");
const getAccessTokenFromCode = require("./utils/getAccessTokenFromCode");
const getUserData = require("./utils/getUserData");
const getRepos = require("./utils/getRepos");
const getSha = require("./utils/getSha");

const authorize = async (req, res) => {
  const code = req.query.code;

  const access_token = await getAccessTokenFromCode(code, request);

  const user = await getUserData(access_token, request);
  console.log("user", user);

  try {
    const repos = await getRepos(request, access_token);
    console.log(repos);

    // go to every repository and fetch the code
    repos.forEach(async (repo) => {
      // get the sha from the commits
      try {
        const sha = await getSha(repo, request, access_token);

        // get the tree from the sha
        const tree = await request(
          `https://api.github.com/repos/${repo.name}/git/trees/${sha}`,
          access_token
        );

        if (tree.tree.type == "tree") {
          console.log(tree);
        } else if (tree.tree.type == "blob") {
          // push the file to the array
          console.log(tree);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }

  // calculate the lines of code {total, public, private}

  // Split the string on \n or \r characters
  // const separateLines = data.split(/\r?\n|\r|\n/g);

  // alert("Total number of separate lines is: " + separateLines.length);

  // take the sum of all lines of code

  res.send("wait");
};

module.exports = authorize;
