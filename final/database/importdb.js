import { client, db } from './dbConnection.js'
import { promises as fs } from 'fs'

try {

    const data = await fs.readFile("./db.json")
    const produtos = JSON.parse(data)

    if (!produtos) throw Error('Arquivo não encontrado!!')

    const mongoDb = client.db("bda")
    const mongoCollection = mongoDb.collection("corridas")
    const result = await mongoCollection.insertMany(produtos)

    if (result.insertedCount == 0)
        throw Error('Erro ao importar protudos!')
    
    console.info("Produtos importados com sucesso!")
    console.log({
        "sucess": true,
        "inserted": result.insertedCount,
        "result": result
    })
} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}