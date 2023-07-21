// Ejercicio 2
const path = require("node:path");
const fs = require("node:fs");

async function writeFile(filePath, data, callback) {
  const directoryPath = path.dirname(filePath);

  fs.mkdir(directoryPath, { recursive: true }, () => {
    fs.writeFile(filePath, data, { recursive: true }, () => callback());
  });
}

function countWordInText(word, text) {
  const regex = new RegExp(word, "gi");
  const founds = text.match(regex);
  return founds ? founds.length : 0;
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const filePath = process.argv[2];
  if (!word) {
    callback(new Error("No se ha especificado la palabra a buscar"));
    return;
  }

  if (!filePath) {
    callback(new Error("No se ha especificado el path del archivo"));
    return;
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err.code);
      if (err.code === "ENOENT") {
        callback(null, 0);
      } else {
        callback(err);
      }
      return;
    }

    const occurrences = countWordInText(word, data);
    callback(null, occurrences);
  });
}

module.exports = {
  writeFile,
  readFileAndCount,
};
