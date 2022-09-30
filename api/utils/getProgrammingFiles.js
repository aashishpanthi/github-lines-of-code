const languages = require("./languages");

const getProgrammingFiles = async (files) => {
  console.log("files to loop: ", files.length);

  const actualFiles = files.filter((file) => {
    const extension = `.${file.path.split(".").pop()}`;

    // return the file if it's a programming language
    for (const language of languages) {
      if (
        language.extensions.includes(extension) &&
        language.type === "programming"
      ) {
        file.language = language.name;
        return file;
      }
    }
  });

  return actualFiles;
};

module.exports = getProgrammingFiles;
