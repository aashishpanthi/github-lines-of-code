const languages = require("./languages");

const getProgrammingFiles = (files) => {
  files.filter((file) => {
    const extension = file.path.split(".").pop();

    // return the file if it's a programming language
    for (const language of languages) {
      for (const ext of language.extensions) {
        if (ext === extension && language.type === "programming") {
          return {
            size: file.size,
            language: language.name,
            url: file.url,
          };
        }
      }
    }
  });
};

module.exports = getProgrammingFiles;
