import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    const dbRef = fb.ref(db, 'produtos')
    const consulta = fb.query(dbRef, fb.orderByKey())
    fb.onValue(consulta,(snapshot)=>{
        if(snapshot.exists()){
            let arraySnapshot = Object.entries(snapshot.val())
            let invert = Object.fromEntries(arraySnapshot.reverse())
            console.log(invert)
            process.exit()
        }
        else
            console.log("Dados não encontrados!")
    }) 
}).catch(err=>console.log(err))