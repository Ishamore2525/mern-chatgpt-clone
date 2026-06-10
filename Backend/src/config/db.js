const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

function connectToDB(){

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Server is connected to database successfully...");
    })
    .catch((error) => {
        console.log("Error connecting to DB")
        process.exit(1)
    })
}

module.exports = connectToDB