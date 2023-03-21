import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    const dbRef = fb.ref(db, 'produtos')
    fb.onValue(dbRef, (snapshot)=>{
        if(snapshot.exists())
            console.log(snapshot.val())
        else  
            console.log("Dados não encontrados")
    })
}).catch(err=>console.log(err))