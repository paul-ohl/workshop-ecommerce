import express, { Express } from "express";
import router from "./routes/router";
const cors = require("cors");

const app: Express = express();
app.use(express.json(), cors());

app.use('/', router);

export default app;
