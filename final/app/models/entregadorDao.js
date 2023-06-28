import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('entregadores')
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

/**
 * Busca produto definido por id_prod igual ao campo id_prod
 * Rotas da API:
 *  GET /produtos/${id}
 * @param {*} id_prod ID do produto a ser retornado
 * @returns Retorna um objeto de Produto
 */
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

//Remove um produto do banco
//API - Testar com cliente HTTP
/**
 * Rota da API:
 *  DELETE /produtos/${id}
 * 
 * @param {*} id_prod ID a ser excluído
 * @returns Booleano de confirmação
 */
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


/** Filtra Produtos por termo de busca para o campo nome ou descricao 
 * Rotas da API:
 * GET /produtos?field=${campo}&search=${termo}
 * campo => nome || descricao
 * 
 * @param {*} field campo de busca (nome ou descricao)
 * @param {*} term termo de busca (palavra a ser encontrada)
 * @returns Array de objetos Produto
 */
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
/**
 * Rota da API:
 * GET /produtos/filter_price/?greater=${min}&less=${max}
 * Parametros:
 * @param {*} greater valor inicial do intervalor
 * @param {*} less valor final do intervalo
 * @param {*} sort ordenar por maior ou menor preco (1,-1)
 * @returns Array de objetos Produto
 */
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
