const url = require('url');

const URL = "https://www.google.com&search=nodejs";

const parsedUrl = url.parse(URL);
const protocol = parsedUrl.protocol;

const hostname = parsedUrl.hostname;

const searchParams = parsedUrl.query;

const newHostname = "www.laplateforme.io";
const newUrl = url.format({
    protocol: protocol,
    hostname: newHostname,
    search: searchParams
});

const URLParam = newUrl + "?lang=fr";

console.log("Le protocole est: " + protocol);

console.log("Nouvelle URL : " + URLParam);
