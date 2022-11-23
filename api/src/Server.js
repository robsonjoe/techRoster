let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbTechs";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());
// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

app.get("/get", (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

    (async function() {
        try {
            await mongoClient.connect();
            // get reference to database via name
            let db = mongoClient.db(DB_NAME);
            let techArray = await db.collection("technologies").find().sort("difficulty",1).toArray();
            let json = { "technologies": techArray };
            // let json = { "technologies": [] };

            // serializes sampleJSON to string format
            response.send(json);
            mongoClient.close();
        } catch (error) {
            console.log(`>>> ERROR : ${error.message}`);
        }   
    }());

});

// wildcard to handle all other non-api URL routings (/selected, /all, /random, /search)
app.use("/*", express.static(CLIENT_BUILD_PATH));

// startup the Express server - listening on port 80
app.listen(80, () => console.log("Listening on port 80"));