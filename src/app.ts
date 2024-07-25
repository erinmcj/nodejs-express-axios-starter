import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { getAllDatabases } from "./controllers/TestController";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


var path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static('views'));
//app.use(express.static('public'));

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', getAllDatabases);

app.get('/index', async (req: express.Request, res: express.Response) => {
  res.render(path.join(__dirname, '../views', 'index.html'));
})