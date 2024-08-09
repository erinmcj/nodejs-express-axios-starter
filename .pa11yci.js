var URL_ENV = process.env.URL_ENV;
var URL;

if(URL_ENV){
    URL = URL_ENV;
} else {
    URL = "http://localhost:3000";
}

module.exports = {
    urls: [
        `${URL}/job-roles`,
        `${URL}/job-roles/1`
    ]
};