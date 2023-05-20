import { FormControl, InputLabel, Input, FormLabel, FormControlLabel, RadioGroup, Button, Radio } from "@mui/material"

/* eslint-disable react/prop-types */
export function Form({ nome, setNome, cpf, setCpf, email, setEmail, nascimento, setNascimento, editMode, setTipo, confirmEdit, cadastrar }) {
    return(
        <form>
        <fieldset>
          <legend> Efetue seu cadastro </legend>
          <FormControl>
            <InputLabel className="Input" htmlFor="nome">Nome</InputLabel>
            <Input className="Input" required id="nome" value={nome} onChange={e =>
            setNome(e.target.value)}/>
          </FormControl>
          <FormControl>
            <InputLabel className="Input" htmlFor="cpf">CPF</InputLabel>
            <Input className="Input" required id="cpf" value={cpf} onChange={e =>
            setCpf(e.target.value)}/>
          </FormControl>
          <FormControl>
            <InputLabel className="Input" htmlFor="email">E-mail</InputLabel>
            <Input className="Input" required id="email" value={email} onChange={e =>
            setEmail(e.target.value)}/>
          </FormControl>
          <FormControl>
            <InputLabel className="Input" htmlFor="nascimento">Nascimento</InputLabel>
            <Input className="Input" required id="nascimento" value={nascimento} onChange={e =>
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
    )
}