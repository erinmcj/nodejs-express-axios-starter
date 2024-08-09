import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { config } from "dotenv";

import { getOpenJobRoles, getJobRole } from "./controllers/JobRoleController";
import { getLoginForm, postLoginForm, postLogout } from "./controllers/AuthController";

config();
if (!process.env.SESSION_KEY) {
    throw Error("Please specify a SESSION_KEY environment variable");
}

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
app.use(session({ 
    secret: process.env.SESSION_KEY, 
    cookie: { maxAge: 28800000 , path: '/' },
    saveUninitialized: false
}));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', getLoginForm);
app.get('/job-roles', getOpenJobRoles);
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);
app.post('/logout', postLogout);
app.get('/job-roles', getOpenJobRoles);
app.get('/job-roles/:id', getJobRole);
