import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/api/messages", mainController.getMessages);
router.post("/api/messages", mainController.createMessage);
router.get("/api/messages/:messageId", mainController.getMessage);
router.get("/api/messages/:messageId/replies", mainController.getReplies);
router.post("/api/messages/:messageId/replies", mainController.createReply);

export { router };
