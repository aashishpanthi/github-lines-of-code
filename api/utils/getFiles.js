const getProgrammingFiles = require("./getProgrammingFiles");
const getTree = require("./getTree");

const getFiles = async (url, request, access_token) => {
  // get the tree from the sha
  const tree = await getTree(url, request, access_token);

  const totalFiles = tree.filter((file) => file.type === "blob");
  totalFiles.forEach((file) => {
    file.src = "";
  });

  const totalFolders = tree.filter((file) => file.type === "tree");

  const filess = async (folder, prevPath) => {
    const { url, path } = folder;

    let src = prevPath ? `${prevPath}/${path}/` : `${path}/`;

    // don't loop for node_modules
    if (path === "node_modules") {
      return;
    }

    try {
      const data = await getTree(url, request, access_token);

      const files = data.filter((file) => file.type === "blob");
      files.forEach((file) => {
        file.src = src;
      });
      totalFiles.push(...files);

      console.log("files: ", files.length);

      const folders = data.filter((file) => file.type === "tree");

      for (const folder of folders) {
        await filess(folder, src);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  for (const folder of totalFolders) {
    await filess(folder);
  }

  const programming_files = await getProgrammingFiles(totalFiles);

  return programming_files;
};

module.exports = getFiles;
