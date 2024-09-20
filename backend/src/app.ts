import express, { Express } from "express";
import router from "./routes/router";

const app: Express = express();
app.use(express.json());

app.use('/', router);

export default app;
