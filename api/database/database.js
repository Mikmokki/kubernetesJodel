import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;
const PGPASS = Deno.env.get("PGPASS");
const PGPASS_PARTS = PGPASS.split(":");
const hostname = PGPASS_PARTS[0];
const port = PGPASS_PARTS[1];
const database = PGPASS_PARTS[2];
const user = PGPASS_PARTS[3];
const password = PGPASS_PARTS[4];
console.log(hostname, port, database, user, password)
const connectionPool = new Pool({ hostname, port, database, user, password }, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };