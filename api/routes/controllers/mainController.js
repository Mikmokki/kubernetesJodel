import * as messageService from "../../services/messageService.js";

const getMessages = async ({request,response }) => {
  const messages = await messageService.getMessages(request.url.searchParams.get("offset")
  );
  response.body = messages;
};
const createMessage = async ({ request, response }) => {
  const { messagetext,token } = await request.body().value;
  console.log(messagetext,token)

  const message = await messageService.createMessage(
    messagetext,token
  );
  mainPageSockets.forEach(ws=>ws.send(JSON.stringify({message,newEntry:true})))

  response.body = message;
};
const getMessage = async ({response,params }) => {
  const message = await messageService.getMessage(params.messageId
  );
  response.body = message;
};
const getReplies= async ({response,params }) => {
  const replies = await messageService.getReplies(params.messageId  );
  response.body = replies;
};
const createReply = async ({ request, response, params}) => {
  const { replytext,token } = await request.body().value;

  const reply = await messageService.createReply(params.messageId,
    replytext,token
  );
  messagePageSockets.forEach(ws=>ws.send(JSON.stringify(reply)))

  response.body = reply;
};

const updateMessage= async ({ request, response, params}) => {
  const { up } = await request.body().value;

  const message = await messageService.updateMessage(params.messageId,
    up
  );
  mainPageSockets.forEach(ws=>ws.send(JSON.stringify({message,newEntry:false})))
  response.body = message;
};

let mainPageSockets= new Set()

const mainPageSocket=(ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }

  const ws = ctx.upgrade();
  ws.onopen = () => {
    mainPageSockets.add(ws)
  };
  ws.onclose = () => mainPageSockets.delete(ws)
};

let messagePageSockets= new Set()

const messagePageSocket=(ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }
  const ws = ctx.upgrade();
  ws.onopen = () => {
    messagePageSockets.add(ws)
  };
  ws.onclose = () => messagePageSockets.delete(ws)
};

// import { connect } from "https://deno.land/x/amqp/mod.ts";

// const connection = await connect();
// const channel = await connection.openChannel();

// const queueName = "my.queue";
// await channel.declareQueue({ queue: queueName });
// await channel.publish(
//   { routingKey: queueName },
//   { contentType: "application/json" },
//   new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
// );

// await connection.close();
export { createMessage, getMessages,getMessage,getReplies,createReply,updateMessage ,mainPageSocket,messagePageSocket};
