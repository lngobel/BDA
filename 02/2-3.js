import db from "./database.js"
import { ref, set } from "firebase/database";

const updatedUser = {
    Idade: 49,
    Nome: "João Derly"
}

set(ref(db,'clientes/2/-NQ8pllGXHy97xeEU_XI'),updatedUser)
.then(() => {
    console.log("Registro alterado!")
    process.exit(0)
})
.catch(error=>console.log("Erro: " + error))
