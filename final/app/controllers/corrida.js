import * as model from '../models/corridaDao.js'

const index = async (req, res) => {
    let listCorridas
    console.log(req.query) 
    listCorridas = await model.getAllCorridas();
    if (!listCorridas)
        return res.status(404).send({ "message": "Sem resultados" })
    res.send(listCorridas);
}

const show = async (req, res) => {
    const corrida = await model.getCorridaById(req.params.id)
    !corrida && res.status(404);
    res.send(corrida)
}

const store = async (req, res) => {
    try {
        const formData = req.body;
        const corrida = {
            id_corrida: +formData.id_corrida,
            id_usu: +formData.id_usu,
            id_ent: +formData.id_ent,
            data: formData.data,
            valor: +formData.valor
        }

        if (await model.insertCorrida(corrida))
            res.send({
                mensagem: "Corrida Inserido!!",
                corrida: corrida
            })
        else throw new Error("Erro ao inserir corrida!")
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
            throw new Error("O ID da corrida é obrigatório")

        const newCorrida = {...formData}
        newCorrida.id_corrida = +req.params.id
        formData.id_usu && (newCorrida.id_usu = +formData.id_usu)
        formData.id_ent && (newCorrida.id_ent = +formData.id_ent)
        formData.data && (newCorrida.data = formData.data)
        formData.valor && (newCorrida.valor = +formData.valor)

        if (!(await model.updateCorrida(newCorrida)))
            throw new Error("Erro ao atualizar corrida!")
        res.send({
            mensagem: "Corrida Atualizada!!",
            corrida: newCorrida
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
        if (!(await model.deleteCorrida(id)))
            throw new Error("Erro ao remover o corrida!")
        res.send({
            success: `Corrida ID:${id}  removida com sucesso!`,
        })
    } catch (error) {
        console.log(error)
        res.status(status);
        res.send({ Error: error.message })
    }
}

export { index, show, store, update, remove }