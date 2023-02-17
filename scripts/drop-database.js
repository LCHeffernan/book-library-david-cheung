const { Client } = require("pg");
const path = require("path");

// capture first command line argument passed to this script
const envName = process.argv.slice(2)[0];

const loadEnv = (envName) => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV != "production") {
    const envFile = envName === "test" ? "../.env.test" : "../.env";

    require("dotenv").config({
      path: path.join(__dirname, envFile),
    });

    const databaseName = process.env.PGDATABASE;

    delete process.env.PGDATABASE;

    return databaseName;
  }
};

const dropDatabase = async (databaseName) => {
  const client = new Client();
  try {
    await client.connect();

    console.log(`Destroying ${databaseName} database...`);

    await client.query(`DROP DATABASE ${databaseName} WITH (FORCE)`);

    console.log("Database destroyed!");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};

const databaseName = loadEnv(envName);
dropDatabase(databaseName);
