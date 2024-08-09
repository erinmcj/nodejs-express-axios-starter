var URL_ENV = process.env.URL_ENV;
var URL;

if(URL_ENV == "Local"){
    URL = "http://localhost:3000";
} else {
    URL = "https://8ddx2p65g4.eu-west-1.awsapprunner.com";
}

module.exports = {
    urls: [
        `${URL}/job-roles`,
        `${URL}/job-roles/1`
    ]
};