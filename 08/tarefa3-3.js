import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (client.db('admin').command({ "ping": 1 }))
        console.log("Conectado!");
    else throw Error("Erro ao conectar ao banco !!")

    const dbName = 'lojaAula11'
    const resultados = await client.db(dbName).collection('produtos')
        .find({
                preco:{$gt:10000},
            },
            {   
                sort:{preco:1},
                projection: { _id: 0, descricao: 0}
            }).toArray()

    console.table(resultados)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}