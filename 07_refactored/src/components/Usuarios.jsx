import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Icon, Paper } from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';

/* eslint-disable react/prop-types */
export function Usuarios({ usuarios, edit, del }) {
    return(
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
                    <Button color="primary" onClick={() => edit("usu",usu.id)}>
                      <EditNoteIcon/>
                    </Button>
                    <Button color="error" onClick={() => del("usu",usu.id)}>
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