import * as model from '../models/usuarioDao.js'

const index = async (req, res) => {
    let listUsuarios
    console.log(req.query) 
    listUsuarios = await model.getAllUsuarios();
    if (!listUsuarios)
        return res.status(404).send({ "message": "Sem resultados" })
    res.send(listUsuarios);
}

const show = async (req, res) => {
    const usuario = await model.getUsuarioById(req.params.id)
    !usuario && res.status(404);
    res.send(usuario)
}

const store = async (req, res) => {
    try {
        const formData = req.body;
        const usuario = {
            id_usu: +formData.id_usu,
            nome: formData.nome,
            nascimento: +formData.nascimento,
            cpf: formData.cpf,
            email: formData.email
        }

        if (await model.insertUsuario(usuario))
            res.send({
                mensagem: "Usuário Inserido!!",
                usuario: usuario
            })
        else throw new Error("Erro ao inserir usuário!")
    } catch (error) {
        const mensagem = { erro: error }
        console.log(mensagem)
        res.status(500);
        res.send(mensagem)
    }
}

const update = async (req, res) => {
    try {
        const formData = req.body;

        if (!req.params.id || req.params.id == 'undefined')
            throw new Error("O ID do usuário é obrigatório")

        const newUsuario = {...formData}
        newUsuario.id_usu = +req.params.id
        formData.nome && (newUsuario.nome = formData.nome)
        formData.nascimento && (newUsuario.nascimento = +formData.nascimento)
        formData.cpf && (newUsuario.cpf = formData.cpf)
        formData.email && (newUsuario.email = formData.email)

        if (!(await model.updateUsuario(newUsuario)))
            throw new Error("Erro ao atualizar usuário!")
        res.send({
            mensagem: "Usuário Atualizado!!",
            usuario: newUsuario
        })
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send({ Error: error.message })
    }
}

const remove = async (req, res) => {
    let status = 500;
    try {
        console.log({ query: req.params })
        if (!req.params.id || !req.params.id === 'undefined') {
            res.status = 400;
            throw new Error("Erro, falta o parâmetro ID na url!")
        }
        const id = parseInt(req.params.id)
        if (!(await model.deleteUsuario(id)))
            throw new Error("Erro ao remover o usuário!")
        res.send({
            success: `Usuário ID:${id}  removido com sucesso!`,
        })
    } catch (error) {
        console.log(error)
        res.status(status);
        res.send({ Error: error.message })
    }
}

export { index, show, store, update, remove }