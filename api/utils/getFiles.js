const getTree = require("./getTree");

const getFiles = async (url, request, access_token) => {
  // get the tree from the sha
  const tree = await getTree(url, request, access_token);

  const totalFiles = tree.filter((file) => file.type === "blob");

  const totalFolders = tree.filter((file) => file.type === "tree");

  const filess = async (folder) => {
    const { url } = folder;

    // don't loop for node_modules
    if (url.includes("node_modules")) {
      return;
    }

    try {
      const data = await getTree(url, request, access_token);

      const files = data.filter((file) => file.type === "blob");
      totalFiles.push(...files);

      console.log("files: ", files.length);

      const folders = data.filter((file) => file.type === "tree");

      for (const folder of folders) {
        await filess(folder);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  for (const folder of totalFolders) {
    await filess(folder);

    // remove the current folder from the totalFolders
    const index = totalFolders.indexOf(folder);
    totalFolders.splice(index, 1);
  }

  //   console.log("totalFiles: ", totalFiles.length);
  //   console.log("totalFolders: ", totalFolders.length);
  console.log(`

  
`);

  return totalFiles;
};

module.exports = getFiles;
