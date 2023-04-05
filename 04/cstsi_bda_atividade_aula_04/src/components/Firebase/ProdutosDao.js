import {
    ref,
    query,
    orderByChild,
    onChildAdded,
    off,
    endAt,
    endBefore,
    equalTo,
    startAt,
    startAfter,
    onValue,
    limitToFirst,
    limitToLast
} from "firebase/database"

function getOrderByChild(order,db,callback){
    //Exemplo
    console.log(order);
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(order))
    onChildAdded(consulta,callback)
}

function getFilterByChild(filter,value,db,callback){
    //implement aqui
    console.log(filter)
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(filter),startAt(value));
    onChildAdded(consulta,callback);
}

function getMostExpensive(db,setValue,list){
    // implement aqui
    /**
     *     Nesta função é necessário implementar o callback,
     * pois será necessário ordenar os resultados no cliente
     * pelos produtos mais caros (reverso). É necessário chamar 
     * a função setValue() e o array list passados como parametro.
     * Para repassar os resultados do client React utiliza-se a função
     * setValue() com os parametros [...list], ou seja, setValue([...list])
     * onde em list deverá estar o array de produtos ordenados pelo preco
     * mais caro. Lembrando que list é um array, use os métodos para trabalhar
     * com arrays em JavaScript! Dica: usem reverse() ou unshift().
     * 
     *  */ 
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'));
    let array = [];
    onChildAdded(consulta,snap=>{
       array.push([snap.val()]);
       list = array.reverse();
       setValue([...list]);
    })
}

function getMostCheap(db,callback){
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'));
    onChildAdded(consulta,callback);
}

function getPriceRange(value,db,callback){//0--->limit
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'),endAt(value));
    onChildAdded(consulta,callback);
}

export {getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange}
