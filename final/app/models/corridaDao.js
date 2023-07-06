import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('corridas')

const getAllCorridas = async (orderBy = 'id_corrida', reverse = false) => {
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


const getCorridaById = async (idCorrida) => {
    try {
        let corrida = {}
        console.log({id:+idCorrida})
        let filtro = { id_corrida: +idCorrida }
        let opcoes = { projection: { _id: 0 } }

        corrida = await collection.findOne(filtro, opcoes)
        if (!corrida)
            throw new Error(`Corrida com ID:${idCorrida} não encontrada!!`)
        return corrida;
    } catch (error) {
        console.log(error)
        return false;
    }
}


const insertCorrida = async (corrida) => {
    try {
        const result = await collection.insertOne(corrida)
        console.log(result.acknowledged && {
            mensagem: 'Corrida Inserida!!!',
            corrida: corrida
        })
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}


const updateCorrida = async (new_corrida) => {
    try {
        const result = await collection.updateOne(
            { id_corrida: new_corrida.id_corrida },
            { $set: new_corrida }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            corrida: new_corrida
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar corrida!')
    } catch (error) {
        console.log(error)
        return false;
    }
}


const deleteCorrida = async (id_corrida) => {
    try {
        const result = await collection.deleteOne({ id_corrida: id_corrida })
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

export {
    getAllCorridas,
    getCorridaById,
    insertCorrida,
    updateCorrida,
    deleteCorrida,
}
