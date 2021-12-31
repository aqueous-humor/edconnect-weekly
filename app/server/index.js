require('dotenv').config();

const mongoose = require('mongoose');
const flash = require('express-flash');
const register = require('@react-ssr/express/register');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const SERVER_PORT = process.env.PORT || 4000;

(async () => {
    await register(app);
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),
        secret: 'secret',
        cookie: {
            maxAge: 251767490995652  //1000 * 60 * 60 * 24 * 7
        },
        resave: true,
        saveUninitialized: false,
    }));

    app.use(flash());
    app.use('/api', require('./routes/api'));
    app.use("/", require("./controllers/user"));
    app.use("/", require("./controllers/home"));
    app.use("/", require("./controllers/project"));
    app.use("/", require("./controllers/comment"));
    //app.use("/", require("./controllers/notification"));
    app.use(express.static('public'));

    app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));
    mongoose.set('bufferCommands', false);
    await mongoose.connect( //added await because of problems arising from slow internet connection
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /**useCreateIndex: true,**/ //Mongoose 6.0 does not support useCreateIndex
        },
        (err) => {
            if (err) {
                console.log('Error connecting to db: ', err);
            } else {
                console.log(`Connected to MongoDB @ ${process.env.MONGODB_URI}`);
            }
        }
    )
})();

