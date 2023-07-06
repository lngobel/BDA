import { useState, useEffect } from 'react'
import './App.css'
import { getAllEntregadores } from '../../app/models/entregadorDao'
import Table from '@mui/material/Table';


function App() {
  const [entregadores, setEntregadores] = useState([])

  useEffect(() => {
    getEntregadores()
  }, []);

  const getEntregadores = async () => {
    setEntregadores([])
    const entList = await getAllEntregadores()
    setEntregadores(entList)
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {entregadores.map((entregador,key)=>{return(
            <tr key={key}>
              <td><a href="">{entregador.id_ent}</a></td>
              <td>{entregador.nome}</td>
              <td>{entregador.email}</td>
              <td>{entregador.cpf}</td>
              <td>{entregador.nascimento}</td>
            </tr>)
          })}
        </tbody>
      </Table>
    </>
  )
}

export default App
