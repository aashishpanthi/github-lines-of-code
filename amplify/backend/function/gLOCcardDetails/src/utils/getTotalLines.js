const getTotalLines = async (files, request, access_token) => {
  let totalPrivateLines = 0;
  let totalPublicLines = 0;
  let totalPrivateSize = 0;
  let totalPublicSize = 0;
  let languageSize = {};

  for (const file of files) {
    const { path, branch, url, src, private, language, size } = file;

    // save the language with its size
    const lang = {
      ...languageSize,
      [language]: size + (languageSize[language] || 0),
    };

    languageSize = lang;

    const data = url
      .replace("api.github", "raw.githubusercontent")
      .replace("/repos", "")
      .split("/git/blobs")[0];

    let rawUrl = `${data}/${branch}/`;
    if (src) {
      rawUrl += `${src}/${path}`;
    } else {
      rawUrl += `${path}`;
    }

    console.log(rawUrl);

    try {
      const fileData = await request(rawUrl, access_token);

      console.log(fileData);

      // seperte the file into lines
      const separateLines = fileData.split(/\r?\n|\r|\n/g);

      // count the lines
      const lines = separateLines.length;
      console.log(lines);

      // add the lines
      if (private) {
        totalPrivateLines += lines;
        totalPrivateSize += file.size;
      } else {
        totalPublicLines += lines;
        totalPublicSize += file.size;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    totalPrivateLines,
    totalPublicLines,
    totalPrivateSize,
    totalPublicSize,
    languageSize,
  };
};

module.exports = getTotalLines;
