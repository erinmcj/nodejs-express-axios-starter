import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";

import { getOpenJobRoles } from "./controllers/JobRoleController";
import session from "express-session";
import { getLoginForm, postLoginForm } from "./controllers/AuthController";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// app.engine('html', nunjucks.render);
// app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('views'));

// FIX ME: store secret in env variable
app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// TO DO - Add this view to the root url
app.get('/test', async (req: express.Request, res: express.Response) => {
    res.render('index.html');
})

app.get('/job-roles', getOpenJobRoles);
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);