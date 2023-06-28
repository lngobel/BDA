import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('usuarios')
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
const getAllUsuarios = async (orderBy = 'id_usu', reverse = false) => {
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
const getUsuarioById = async (idUsu) => {
    try {
        let usuario = {}
        console.log({id:+idUsu})
        let filtro = { id_usu: +idUsu }
        let opcoes = { projection: { _id: 0 } }

        usuario = await collection.findOne(filtro, opcoes)
        if (!usuario)
            throw new Error(`Usuário com ID:${idUsu} não encontrado!!`)
        return usuario;
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
const insertUsuario = async (usuario) => {
    try {
        const result = await collection.insertOne(usuario)
        console.log(result.acknowledged && {
            mensagem: 'Usuário Inserido!!!',
            usuario: usuario
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
const updateUsuario = async (new_usuario) => {
    try {
        const result = await collection.updateOne(
            { id_usu: new_usuario.id_usu },
            { $set: new_usuario }
        )
        console.log({
            result: result,
            updated: result.modifiedCount > 0,
            usuario: new_usuario
        })
        if (result.modifiedCount) return true
        else throw new Error('DAO: Erro ao atualizar usuário!')
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
const deleteUsuario = async (id_usu) => {
    try {
        const result = await collection.deleteOne({ id_usu: id_usu })
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
    getAllUsuarios,
    getUsuarioById,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
}
