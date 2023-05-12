import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebase.js';
import './App.css';
import * as React from 'react';
import { Button, FormControl, Icon, InputLabel, Tab, RadioGroup, FormLabel, FormControlLabel, Radio, IconButton, Collapse, Box, Typography } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function App(){

  console.log("Render!!")
  var coll = ""
  var result = ""
  var t = ""

  const [entregador, setEntregador] = useState({})
  const [entregadores, setEntregadores] = useState([])
  const [usuario, setUsuario] = useState({})
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [tipo, setTipo] = useState("usuarios");
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false)

  const collectionEnt = collection(db, "entregadores");
  const collectionUsu = collection(db, "usuarios");

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
    if(t === "ent")
      result = entregadores.filter(entregador => entregador.id === id)[0]
    else
      result = usuarios.filter(usuario => usuario.id === id)[0]
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
    await updateDoc(doc(db,"entregadores",entregador.id),{
      nome: nome,
      cpf: cpf,
      email: email,
      nascimento: nascimento
    })
    setEntregador({})
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
      <form>
        <fieldset>
          <legend> Efetue seu cadastro </legend>
          <FormControl>
            <InputLabel htmlFor="nome">Nome</InputLabel>
            <Input required id="nome" value={nome} onChange={e =>
            setNome(e.target.value)}/>
          </FormControl>
          <Tab></Tab><FormControl>
            <InputLabel htmlFor="cpf">CPF</InputLabel>
            <Input required id="cpf" value={cpf} onChange={e =>
            setCpf(e.target.value)}/>
          </FormControl>
          <Tab></Tab><FormControl>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input required id="email" value={email} onChange={e =>
            setEmail(e.target.value)}/>
          </FormControl>
          <Tab></Tab><FormControl>
            <InputLabel htmlFor="nascimento">Nascimento</InputLabel>
            <Input required id="nascimento" value={nascimento} onChange={e =>
            setNascimento(e.target.value)}/>
          </FormControl>
          <br></br> <br></br>
          {!editMode ? <FormControl>
            <FormLabel id="type">Cadastrar como:</FormLabel>
            <RadioGroup aria-labelledby="type" defaultValue="usuarios" name="type" onChange={e => {setTipo(e.target.value)}}>
              <FormControlLabel value="usuarios" control={<Radio />} label="Usuário" />
              <FormControlLabel value="entregadores" control={<Radio />} label="Entregador" />
            </RadioGroup>
          </FormControl>
          :''}       
          <p><Button type="submit" variant="contained" onClick={editMode ? confirmEdit : cadastrar}>
              {!editMode ? "Cadastrar" : "Editar"}
          </Button></p>
        </fieldset>
      </form>



      <div className='Table'>
        <h3>Entregadores</h3>
        <TableContainer component={Paper} title='Entregadores'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Nascimento</TableCell>
                <TableCell align="right">Editar/Apagar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entregadores.map((ent) => (
                <TableRow key={ent.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{ent.id}</TableCell>
                  <TableCell align="right">{ent.nome}</TableCell>
                  <TableCell align="right">{ent.cpf}</TableCell>
                  <TableCell align="right">{ent.email}</TableCell>
                  <TableCell align="right">{ent.nascimento}</TableCell>
                  <TableCell align="right">
                    <Button color="primary" onClick={e => edit(t="ent",ent.id)}>
                      <EditNoteIcon/>
                    </Button>
                    <Button color="error" onClick={e => del(t="ent",ent.id)}>
                      <Icon>delete_forever</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>



      <div className='Table'>
        <h3>Usuários</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Nascimento</TableCell>
                <TableCell align="right">Editar/Apagar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usu) => (
                <TableRow key={usu.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{usu.id}</TableCell>
                  <TableCell align="right">{usu.nome}</TableCell>
                  <TableCell align="right">{usu.cpf}</TableCell>
                  <TableCell align="right">{usu.email}</TableCell>
                  <TableCell align="right">{usu.nascimento}</TableCell>
                  <TableCell align="right">
                    <Button color="primary" onClick={e => edit(t="usu",usu.id)}>
                      <EditNoteIcon/>
                    </Button>
                    <Button color="error" onClick={e => del(t="usu",usu.id)}>
                      <Icon>delete_forever</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


      <div className='Veiculos'>
        <h3>Veículos</h3>
        {entregadores.map(ent => (
        <div className='Veiculo'>
            {ent.veiculos ? 
              <details className='Detalhes' style={{ display: 'inline' }}>
                <summary>{ent.nome} | Id: {ent.id}</summary>
                {ent.veiculos.map(vei => (
                <details>
                  <summary>{vei.marca} {vei.modelo}</summary>
                  <ul>
                      <li>{vei.marca}</li>
                      <li>{vei.modelo}</li>
                      <li>{vei.cilindradas} cilindradas</li>
                      <li>Ano: {vei.ano}</li>
                  </ul>
                </details>
                ))}
              </details>
            : ''}
        </div>
        ))}
      </div>

    </div>
  );
}



export default App;