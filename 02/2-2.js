import db from "./database.js"
import { child, set, ref } from "firebase/database";

const refNode = ref(db, 'clientes/1/-NQ8pllEYxh1QzTal2nm')
const refAttr = child(refNode,'Nome')

set(refAttr,"Maria Geromel")
.then(() => {
    console.log("Registro alterado!")
    process.exit(0)
})
.catch(error=>console.log("Erro: " + error))
