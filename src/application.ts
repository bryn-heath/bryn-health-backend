import * as express from "express";
import * as cors from 'cors';

import {eventsController, timelineController} from "./controllers/events";

const app = express();

app.use(cors())
app.use(eventsController);
app.use(timelineController);

export default app;
