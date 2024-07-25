import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import {getAllDatabases} from "./controllers/TestController";
import path from "node:path";

const app = express();

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(session({secret: 'SUPER_SECRET', cookie: {maxAge: 28800000}}));

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', getAllDatabases);

app.get('/index', async (req: express.Request, res: express.Response) => {
    res.render('index.html');
})
