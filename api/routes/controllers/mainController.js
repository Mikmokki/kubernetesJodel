import * as messageService from "../../services/messageService.js";

const getMessages = async ({request,response }) => {
  const messages = await messageService.getMessages(request.url.searchParams.get("offset")
  );
  response.body = messages;
};
const createMessage = async ({ request, response }) => {
  const { messagetext,token } = await request.body().value;
  console.log(messagetext,token)

  const messages = await messageService.createMessage(
    messagetext,token
  );
  response.body = messages;
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

  const messages = await messageService.createReply(params.messageId,
    replytext,token
  );
  response.body = messages;
};
export { createMessage, getMessages,getMessage,getReplies,createReply };
