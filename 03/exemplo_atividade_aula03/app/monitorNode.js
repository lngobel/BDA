import  * as fb from "firebase/database";// sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    const dbRef = fb.ref(db, 'produtos')
    fb.onChildChanged(dbRef, (snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val())
            if(snapshot.key == '-MwSzyJMlNDToTGtPuhc'){
                fb.off(dbRef, 'child_changed')
                console.log("Callback removido!")
            }
        }
        else  
            console.log("Dados não encontrados")
    })
}).catch(err=>console.log(err))