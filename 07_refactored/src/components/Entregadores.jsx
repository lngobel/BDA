import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Icon, Paper } from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';

/* eslint-disable react/prop-types */
export function Entregadores({ entregadores, edit, del }) {
    return(
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
                    <Button color="primary" onClick={() => edit("ent",ent.id)}>
                      <EditNoteIcon/>
                    </Button>
                    <Button color="error" onClick={() => del("ent",ent.id)}>
                      <Icon>delete_forever</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}