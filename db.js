const mongoClient = require('mongodb').MongoClient;

const URI = 'mongodb://localhost:27017';

mongoClient.connect(URI, {useUnifiedTopology: true})
            .then(conn => global.conn = conn.db("local"))
            .catch(err => console.log(err))

const pagina_size = 10;

function findAll(pagina){
    const qtdPular = pagina_size * (pagina - 1);
    return global.conn.collection("customers")
            .find({})
            .skip(qtdPular)
            .limit(pagina_size)
            .toArray();
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

function countAll(){
    return global.conn.collection("customers").countDocuments();
} 

module.exports = { findAll, insertCustomer, findCustomer, updateCustomer, deleteCustomer, pagina_size, countAll }