const request = require("./request");

const getTotalLines = async (files, access_token) => {
  let totalLines = 0;

  for (const file of files) {
    const { path, branch, url } = file;

    const data = url
      .replace("api.github", "raw.githubusercontent")
      .replace("/repos", "")
      .split("/git/blobs")[0];
    const rawUrl = `${data}/${branch}/${path}`;

    const fileData = await request(rawUrl, access_token);

    // seperte the file into lines
    const separateLines = fileData.split(/\r?\n|\r|\n/g);

    // count the lines
    const lines = separateLines.length;

    // add the lines
    totalLines += lines;
  }

  return totalLines;
};

module.exports = getTotalLines;
