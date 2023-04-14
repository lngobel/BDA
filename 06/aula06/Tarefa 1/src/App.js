import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from './firebase.js';
import './App.css';

function App() {
  console.log("Render!!")
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState({})

  const [isLoaded, setLoaded] = useState(false)
  const collectionRef = collection(db, "todos");

  useEffect(() => {
    const unsub = onSnapshot(collectionRef,()=>{getTodos()})
  }, []);

  const getTodos = () => {
    setTodos([])
    getDocs(collectionRef)
      .then(querySnap => {
        //console.log(querySnap.docs.map(d=>d.data().todo))
        const docs = querySnap.docs
        if (!docs.length)
          throw Error("Empty data!")

        const todos = docs.map(
          doc => ({
            id: doc.id,
            text: doc.data().todo
          })
        )
        setTodos(todos)
        setLoaded(true)
      }).catch(e =>
        console.error(e.message)
      );
  }


  const addTodo = async e => {
    e.preventDefault()
    const docRef = await addDoc(collectionRef, { todo: input })
    console.log(docRef.id)
    getTodos()
    setInput('')
  }

  const delTodo = async todoId => {
    await deleteDoc(doc(db, 'todos', todoId));
    getTodos()
  }

  const updTodo = async e => {
    e.preventDefault()
    await updateDoc(doc(db, "todos", todo.id), { todo: input })
    
    setTodo({})
    setInput('')
    setEditMode(false)

    getTodos()
  }

  const editTodo = (todoId)=>{
    const todo = todos.filter(todo => todo.id === todoId)[0];
    setInput(todo.text)
    setTodo(todo)
    setEditMode(true)
  }

  return (
    <div className="App">
      <h1>TODO React Firebase</h1>
      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input value={input} onChange={e =>
            setInput(e.target.value)} />
        </FormControl>
        <Button
          type="submit" onClick={!editMode ? addTodo : updTodo}
          variant="contained"
          color={!editMode ? "primary" : "success"}
          disabled={!input}>
          {!editMode ? "Add" : "Edit"}
          &nbsp;Todo
        </Button>
      </form>
      {isLoaded ?
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo) => {
            return (<li key={todo.id}>
              {todo.text}
              <Button
                onClick={e => editTodo(todo.id)}
                color="primary" >
                {/* <Icon>edit_note</Icon> */}
                <EditNoteIcon/>
              </Button>
              <Button
                onClick={e => delTodo(todo.id)}
                color="error" >
                <Icon>delete_forever</Icon>
              </Button>
            </li>
            )
          }
          )}
        </ul>
        : <p>Loading from Firestore...</p>
      }
    </div>
  );
}
export default App;
