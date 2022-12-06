import { executeQuery } from "../database/database.js";

const getMessages = async (offset=0) => {
  const res = await executeQuery(
    `SELECT * FROM message ORDER BY timestamp DESC
    OFFSET $offset ROWS FETCH FIRST 20 ROW ONLY;`,{offset}
  );
  return res.rows;
};
const createMessage = async (messagetext, token) => {
  const res = await executeQuery(
    "INSERT INTO message (messagetext,token) VALUES ($messagetext, $token);",
    { messagetext, token },
  );
  return res.rows;
};
const getMessage = async (id) => {
  const res = await executeQuery(
    `SELECT * FROM message WHERE id=$id`,{id}
  );
  return res.rows?.[0];
};
const getReplies = async (messageid) => {
  const res = await executeQuery(
    `SELECT * FROM reply WHERE messageid=$messageid ORDER BY timestamp DESC;`,{messageid}
  );
  return res.rows;
};
const createReply = async (messageid,replytext, token) => {
  console.log(messageid,replytext, token)
  const res = await executeQuery(
    "INSERT INTO reply (messageid,replytext,token) VALUES ($messageid, $replytext, $token);",
    { messageid,replytext, token },
  );
  return res.rows;
};
export { createMessage, getMessages,getMessage,getReplies,createReply };
