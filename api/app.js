import { Application} from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import { router } from "./routes/routes.js";

const app = new Application();
app.use(errorMiddleware);

app.use(router.routes());

app.listen({ port: 7777});
