import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from './firebase.js';
import './App.css';
import * as React from 'react';
import { Button, Icon } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App(){

  console.log("Render!!")

  const [entregadores, setEntregadores] = useState([])
  const collectionRef = collection(db, "entregadores");

  useEffect(() => {
    const unsub = onSnapshot(collectionRef,()=>{getTodos()})
  }, []);

  const getTodos = () => {
    setEntregadores([])
    getDocs(collectionRef)
      .then(querySnap => {
        const docs = querySnap.docs
        if (!docs.length)
          throw Error("Empty data!")

        const entregadores = docs.map(
          doc => ({
            id: doc.id,
            nome: doc.data().nome,
            cpf: doc.data().cpf,
            email: doc.data().email,
            nascimento: doc.data().nascimento
          })
        )
        setEntregadores(entregadores)
      }).catch(e =>
        console.error(e.message)
      );
  }

  return (
    <div className='App'>
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
            {entregadores.map((ent) => (
              <TableRow key={ent.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{ent.id}</TableCell>
                <TableCell align="right">{ent.nome}</TableCell>
                <TableCell align="right">{ent.cpf}</TableCell>
                <TableCell align="right">{ent.email}</TableCell>
                <TableCell align="right">{ent.nascimento}</TableCell>
                <TableCell align="right">
                  <Button color="primary">
                    <EditNoteIcon/>
                  </Button>
                  <Button color="error" >
                    <Icon>delete_forever</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      // <div>{todos.map((todo) => {
      //   return(<h1>{todo.text}</h1>)
      // })}
      // </div>
  );
}
export default App;