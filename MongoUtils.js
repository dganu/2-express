const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mernstack:mernstack@tutorial.6whguyp.mongodb.net/?retryWrites=true&w=majority";
let _db;

const connectToServer = () =>
{
    MongoClient.connect(uri, { useNewUrlParser: true }).then((client)=> {
        _db = client.db('tutorial');
        console.log("db is connected");
    }).catch(err => 
        {
            console.error(err.message);
        })
}

const getDb = () => { //this returns database instance
    return _db;
}
module.exports.connectToServer = connectToServer
module.exports.getDb = getDb 