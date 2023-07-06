import { client, db } from '../../database/dbConnection.js'

const collection = client.db(db).collection('usuarios')

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
