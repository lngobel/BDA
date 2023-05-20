import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, updateDoc, doc, addDoc, deleteDoc, getFirestore, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "../firebase/config"
import { initializeApp } from 'firebase/app'
import * as React from 'react';
import '../assets/styles/App.css';
import { Entregadores } from './Entregadores';
import { Usuarios } from './Usuarios';
import { Veiculos } from './Veiculos';
import { Form } from './Form';
import { FormControl, InputLabel, Input, FormLabel, FormControlLabel, RadioGroup, Button, Radio } from "@mui/material"

function App(){

  console.log("Render!!")
  var coll = ""
  var result = ""
  var t = ""
  var documento = ""

  const [entregador, setEntregador] = useState({})
  const [entregadores, setEntregadores] = useState([])
  const [veiculos, setVeiculos] = useState({})
  const [veiculo, setVeiculo] = useState({})
  const [usuario, setUsuario] = useState({})
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [nascimento, setNascimento] = useState("")
  const [id, setId] = useState ("")
  const [marca, setMarca] = useState("")
  const [modelo, setModelo] = useState("")
  const [cilindradas, setCilindradas] = useState("")
  const [ano,setAno] = useState("")
  const [tipo, setTipo] = useState("usuarios")
  const [editMode, setEditMode] = useState(false)
  
  const db = getFirestore(initializeApp(firebaseConfig))

  const collectionEnt = collection(db, "entregadores")
  const collectionUsu = collection(db, "usuarios")

  useEffect(() => {
    const unsubEnt = onSnapshot(collectionEnt,()=>{getEntregadores()})
    const unsubUsu = onSnapshot(collectionUsu,()=>{getUsuarios()})
  }, []);

  const getEntregadores = () => {
    setEntregadores([])
    getDocs(collectionEnt)
      .then(querySnap => {
        const docsEnt = querySnap.docs
        if (!docsEnt.length)
          throw Error("Empty data!")

        const entregadores = docsEnt.map(
          doc => ({
            id: doc.id,
            nome: doc.data().nome,
            cpf: doc.data().cpf,
            email: doc.data().email,
            nascimento: doc.data().nascimento,
            veiculos: doc.data().veiculos
          })
        )
        console.log(entregadores)
        setEntregadores(entregadores)
      }).catch(e =>
        console.error(e.message)
      );
  }

  const getUsuarios = () => {
    setUsuarios([])
    getDocs(collectionUsu)
      .then(querySnap => {
        const docsUsu = querySnap.docs
        if (!docsUsu.length)
          throw Error("Empty data!")

        const usuarios = docsUsu.map(
          doc => ({
            id: doc.id,
            nome: doc.data().nome,
            cpf: doc.data().cpf,
            email: doc.data().email,
            nascimento: doc.data().nascimento
          })
        )
        setUsuarios(usuarios)
      }).catch(e =>
        console.error(e.message)
      );
  }

  const edit = (t,id) => {
    if(t === "ent"){
      result = entregadores.filter(entregador => entregador.id === id)[0]
      setTipo("entregadores")
    }
    else{
      result = usuarios.filter(usuario => usuario.id === id)[0]
      setTipo("usuarios")
    }
    setNome(result.nome)
    setCpf(result.cpf)
    setEmail(result.email)
    setNascimento(result.nascimento)
    if(t === "ent")
      setEntregador(result)
    else
      setUsuario(result)
    setEditMode(true)
  }

  const del = async (t,id) => {
    if(t === "ent")
      await deleteDoc(doc(db,"entregadores",id))
    else
      await deleteDoc(doc(db,"usuarios",id))
    getEntregadores()
    getUsuarios()
  }

  const confirmEdit = async e => {
    e.preventDefault()
    if(tipo === "entregadores")
      documento = entregador.id
    else
      documento = usuario.id
    await updateDoc(doc(db,tipo,documento),{
      nome: nome,
      cpf: cpf,
      email: email,
      nascimento: nascimento
    })
    setEntregador({})
    setUsuario({})
    setTipo("usuarios")
    setNome("")
    setCpf("")
    setEmail("")
    setNascimento("")
    setEditMode(false)
    getEntregadores()
    getUsuarios()
    
  }

  const cadastrar = async e => {
    e.preventDefault()
    if(tipo === "entregadores")
      coll = collectionEnt
    else
      coll = collectionUsu
    await addDoc(coll, {
      nome: nome,
      cpf: cpf,
      email: email,
      nascimento: nascimento
    })
    setNome("")
    setCpf("")
    setEmail("")
    setNascimento("")
    getEntregadores()
  }

  return (
    <div className='App'>
      
      <Form nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} email={email} setEmail={setEmail} nascimento={nascimento} setNascimento={setNascimento} editMode={editMode} setTipo={setTipo} confirmEdit={confirmEdit} cadastrar={cadastrar} />

      <h3>Entregadores</h3>
      <Entregadores className='Table' entregadores={entregadores} edit={edit} del={del}/>
      
      <h3>Usuários</h3>
      <Usuarios className='Table' usuarios={usuarios} edit={edit} del={del}/>

      <h3>Veículos</h3>
      <Veiculos className='Veiculos' entregadores={entregadores}></Veiculos>

    </div>
  );
}

export default App;