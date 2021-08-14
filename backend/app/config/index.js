const configEnv = require("./config.env.json");
const configGlobal = require("./config.global.json");
const database = require("./database.json");

const env = process.env.NODE_ENV || "development";
const config = { ...configGlobal, ...configEnv[env], db: { ...database[env] } };

module.exports = config;
