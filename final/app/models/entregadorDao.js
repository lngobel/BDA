import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('entregadores')

const getAllEntregadores = async (orderBy = 'id_ent', reverse = false) => {
    try {
        let resultados = []
        let opcoes = {
            sort: {[orderBy]:!reverse ? 1 : -1},
            projection: { _id: 0 }
        }
        console.log({ orderBy, opcoes })
        resultados = await collection.find({}, opcoes).toArray()
        return resultados;
    } catch (error) {
        console.log(error)
        return false;
    }
}


const getEntregadorById = async (idEnt) => {
    try {
        let entregador = {}
        console.log({id:+idEnt})
        let filtro = { id_ent: +idEnt }
        let opcoes = { projection: { _id: 0 } }

        entregador = await collection.findOne(filtro, opcoes)
        if (!entregador)
            throw new Error(`Entregador com ID:${idEnt} não encontrado!!`)
        return entregador;
    } catch (error) {
        console.log(error)
        return false;
    }
}


const insertEntregador = async (entregador) => {
    try {
        const result = await collection.insertOne(entregador)
        console.log(result.acknowledged && {
            mensagem: 'Entregador Inserido!!!',
            entregador: entregador
        })
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}


const updateEntregador = async (new_entregador) => {
    try {
        const result = await collection.updateOne(
            { id_ent: new_entregador.id_ent },
            { $set: new_entregador }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            entregador: new_entregador
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar entregador!')
    } catch (error) {
        console.log(error)
        return false;
    }
}


const deleteEntregador = async (id_ent) => {
    try {
        const result = await collection.deleteOne({ id_ent: id_ent })
        console.log({
            result: result,
            deleted: result.deletedCount > 0,
        })
        return result.deletedCount === 1
    } catch (error) {
        console.log(error)
        return false;
    }
}


const getEntregadoresName = async (nome = '') => {
    try {
        let resultados = []
        console.log({ nome })
        await changeIndexes()

        let filtro = {
            $text: { $search: nome }
        }
        let opcoes = {
            projection: { _id: 0 }
        }
        console.log(opcoes)
        resultados = await collection.find(filtro, opcoes).toArray()
        return resultados;
    } catch (error) {
        console.log(error)
        return false;
    }
}


const getEntregadoresYear = async (min = 1900, max = 2024, sort = 1) => {
    try {
        let resultados = []
        console.log({ min, max })
        let filtro = {
            $and: [
                { nascimento: { $gte: min } },
                { nascimento: { $lte: max } }
            ]
        }
        let opcoes = {
            sort: { nascimento: parseInt(sort) },
            projection: { _id: 0 }
        }
        console.log(opcoes)
        resultados = await collection.find(filtro, opcoes).toArray()
        return resultados;
    } catch (error) {
        console.log(error)
        return false;
    }
}


const changeIndexes = async () => {

    const indexes = await collection.indexes()
    const textIndexes = indexes.filter(index => index.key?._fts === 'text')
    const indexName = textIndexes[0]?.name
    
    if (!indexName || indexName !== 'nome_text'){
        if(indexName)
            await collection.dropIndex(indexName)
        await collection.createIndex({nome:'text'})
    }
}

export {
    getAllEntregadores,
    getEntregadorById,
    insertEntregador,
    updateEntregador,
    deleteEntregador,
    getEntregadoresName,
    getEntregadoresYear
}
