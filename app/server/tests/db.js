const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


//Create new database
const db = new MongoMemoryServer();

//connect to db before the test begins
const connectDb = async () => {
    //Generate connection string
    const uri = await db.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

//disconnect db when all tests are complete
const closeDb = async () => {
    //delete db
    await mongoose.connection.dropDatabase();
    //close connection
    await mongoose.connection.close();
    await db.stop();
}

//clear data from all collections in db at the end of each test so the next one begins on a clean slate
const clearDb = async () => {
    //get all collections in the database
    const collections = mongoose.connection.collections;
    //iterate through the collections and clear each one
    for (let key in collections) {
        const collection = collections[key];
        await collection.deleteMany({})
    }
}

module.exports = {
    connectDb,
    closeDb,
    clearDb
}

//ref: https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np