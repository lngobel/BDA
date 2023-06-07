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

    const dbName = 'bancoAula12'
    const collection = client.db(dbName)
        .collection('produtos')


    //COMANDO PARA A CRIAÇÃO DO INDICE
    //db.getCollection('produtos').createIndex({descricao: 'text'})

    const filtro = {
        $text: {
            $search: 'GAMER'
        }
    }
        
    const opcoes = { 
        sort: { preco: 1 },
        projection: { _id: 0, descricao: 1 }
    }


    const resultados = await collection.find(filtro, opcoes).toArray()

    console.table(resultados)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}