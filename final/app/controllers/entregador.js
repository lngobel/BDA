import * as model from '../models/entregadorDao.js'

const index = async (req, res) => {
    let listEnts
    console.log(req.query)
    if (req.query.order) {
        let orderBy = req.query.order
        let reverse = +req.query.reverse ? true : false
        listEnts = await model.getAllEntregadores(orderBy, reverse);
    } else if (req.query.search) {
        listEnts = await model.getEntregadoresName(req.query.search);
    } else {
        listEnts = await model.getAllEntregadores();
    }
    if (!listEnts)
        return res.status(404).send({ "message": "Sem resultados" })
    res.send(listEnts);
}

const show = async (req, res) => {
    const entregador = await model.getEntregadorById(req.params.id)
    !entregador && res.status(404);
    res.send(entregador)
}

const store = async (req, res) => {
    try {
        const formData = req.body;
        const entregador = {
            id_ent: +formData.id_ent,
            nome: formData.nome,
            nascimento: +formData.nascimento,
            cpf: formData.cpf,
            email: formData.email
        }

        if (await model.insertEntregador(entregador))
            res.send({
                mensagem: "Entregador Inserido!!",
                entregador: entregador
            })
        else throw new Error("Erro ao inserir entregador!")
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
            throw new Error("O ID do entregador é obrigatório")

        const newEntregador = {...formData}
        newEntregador.id_ent = +req.params.id
        formData.nome && (newEntregador.nome = formData.nome)
        formData.nascimento && (newEntregador.nascimento = +formData.nascimento)
        formData.cpf && (newEntregador.cpf = formData.cpf)
        formData.email && (newEntregador.email = formData.email)

        if (!(await model.updateEntregador(newEntregador)))
            throw new Error("Erro ao atualizar entregador!")
        res.send({
            mensagem: "Entregador Atualizado!!",
            entregador: newEntregador
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
        if (!(await model.deleteEntregador(id)))
            throw new Error("Erro ao remover o entregador!")
        res.send({
            success: `Entregador ID:${id}  removido com sucesso!`,
        })
    } catch (error) {
        console.log(error)
        res.status(status);
        res.send({ Error: error.message })
    }
}

const filterYear = async (req, res) => {
    try {
        let statusError = 500;
        if (!req.query.greater || !req.query.less) {
            statusError = 401;
            throw new Error('Faltam parâmetros!')
        }
        const greater = Number(req.query.greater)
        const less = Number(req.query.less)
        const sort = req.query.sort ? req.query.sort : 1
        const listEnts = await model.getEntregadoresYear(greater, less, sort)
        if (!listEnts){
            statusError = 404;
            throw new Error('Sem resultados!')
        }
        res.send(listEnts)
    } catch (error) {
        const mensagem = { erro: error }
        console.log(mensagem)
        res.status(statusError);
        res.send(mensagem)
    }
}

export { index, show, store, update, remove, filterYear }
