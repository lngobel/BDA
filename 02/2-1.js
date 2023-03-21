import db from "./database.js"
import { push, ref } from "firebase/database";

var newCliente = {
	Nome: 'Maria',
	Idade: 15
}
push(ref(db, 'clientes/'+1), newCliente)
.then(() => {
    console.log("Registro adicionado!")
})
.catch(error=>console.log("Erro: " + error))

newCliente = {
    Nome: 'João',
    Idade: 25
}
push(ref(db, 'clientes/'+2), newCliente)
.then(() => {
    console.log("Registro adicionado!")
})
.catch(error=>console.log("Erro: " + error))

newCliente = {
    Nome: 'Ana',
    Idade: 23
}
push(ref(db, 'clientes/'+3), newCliente)
.then(() => {
    console.log("Registro adicionado!")
    process.exit(0)
})
.catch(error=>console.log("Erro: " + error))
