import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (!client.db('admin').command({ "ping": 1 }))
        throw Error("Erro ao conectar ao banco !!")
    console.log("Conectado!");

    const produto = {
        descricao: "iPhone XR 2017 4GB iOS 15",
        id_prod: 138,
        importado: false,
        nome: "iPhone XR - 2017",
        preco: 4250,
        qtd_estoque: 12
    }

    if (typeof produto === 'undefined' && !produto)
        throw Error('Arquivo não encontrado!!')

    const mongoDb = client.db('lojaAula11')
    const mongoCollection = mongoDb.collection('produtos')
    const result = await
     mongoCollection.insertOne(produto);
    if (!result)
        throw Error('Erro ao importar produto!')
    console.info("Produto importado com sucesso!")
    console.log({
        "sucess": true,
        "result": result
    })
} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}