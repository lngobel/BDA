import { MongoClient } from 'mongodb'

const server = "localhost"

const port = "27017"
const db = "loja"
const uri = `mongodb://${server}:${port}/${db}`;

const client = new MongoClient(uri);
await client.connect()
if (client.db('admin').command({ "ping": 1 }))
    console.log("Conectado ao Banco MongoDB!");
else throw Error("Erro ao conectar ao banco !!")

export {client,db};