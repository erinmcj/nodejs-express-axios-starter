var URL_ENV = process.env.URL_ENV;
var URL;

if(URL_ENV == "Local"){
    URL = "http://localhost:3000";
} else {
    URL = URL_ENV;
}

module.exports = {
    urls: [
        `${URL}/job-roles`,
        `${URL}/job-roles/1`
    ]
};