const mongoClient = require('mongodb').MongoClient;

const URI = 'mongodb://localhost:27017';

mongoClient.connect(URI, {useUnifiedTopology: true})
            .then(conn => global.conn = conn.db("local"))
            .catch(err => console.log(err))

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
} 

function insertCustomer(customer,callback){
    global.conn.collection("customers").insert(customer, callback);
} 

var ObjectId = require("mongodb").ObjectId;
function findCustomer(id,callback){
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
} 

function updateCustomer(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, {$set: customer}, callback);
} 

function deleteCustomer(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
} 

module.exports = { findAll, insertCustomer, findCustomer, updateCustomer, deleteCustomer }