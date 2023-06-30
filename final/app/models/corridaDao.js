import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('corridas')
/**
 * Retorna produtos ordenados de acordo com o campo definido em orderBy
 * e ordenados na ordem definida por reverse, se verdadeiro ordem reversa (ASC)
 * Rotas da API:
 * GET /produtos
 * GET /produtos?order=${campo}&reverse=${valor}
 * 
 * @param {*} orderBy campo a ser utilizado na ordenacao
 * @param {*} reverse booleano para a determinar a ordem ascendente (true) ou descendente (false)
 * @returns Array de objetos Produto
 */
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

/**
 * Busca produto definido por id_prod igual ao campo id_prod
 * Rotas da API:
 *  GET /produtos/${id}
 * @param {*} id_prod ID do produto a ser retornado
 * @returns Retorna um objeto de Produto
 */
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

//Registra um novo produto no banco, 
//retorna verdadeiro se inserido com sucesso
//API - Testar com cliente HTTP
/**
 * Rota da API:
 *  POST /produtos
 * 
 * @param {*} produto Objeto Produto com os campos a serem inseridos
 * @returns 
 */
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

//Atualiza um produto no banco
//retorna verdadeiro se atualizado com sucesso
//API - Testar com cliente HTTP
/**
 * Rota da API:
 *  PUT /produtos/${id}
 * 
 * @param {*} new_produto Objeto com os campos a serem atualizados
 * @returns booleano de confirmação
 */
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

//Remove um produto do banco
//API - Testar com cliente HTTP
/**
 * Rota da API:
 *  DELETE /produtos/${id}
 * 
 * @param {*} id_prod ID a ser excluído
 * @returns Booleano de confirmação
 */
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
