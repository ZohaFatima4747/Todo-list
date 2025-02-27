import { useState,useEffect } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
 
 
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
}
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(Todos))
  }
  
  

  const handleEdit = (e, id)=>{
   let t = Todos.filter(i=>i.id === id)
   setTodo(t[0].todo)
   let newTodos = Todos.filter(item=>{
    return item.id!==id
  });
 
  setTodos(newTodos)
  saveToLS()
  }


  const handleDelete = (e, id)=>{
     let newTodos = Todos.filter(item=>{
        return item.id!==id
      });
     
      setTodos(newTodos)
      saveToLS()
   }


  const handleAdd = ()=>{
    setTodos([...Todos, {id: uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }


  const handleChange = (e)=>{
  setTodo(e.target.value)
  }



 const handlecheckbox =(e) => {
   let id = e.target.name;
   console.log(`the id is ${id}`)
   let index = Todos.findIndex ( item=>{
   return item.id === id;
   })
   let newTodos = [...Todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()
 }
 






  return (
    <>
      <Navbar/>
      <div className='heading1 heading-1'>
        <h1>iTask -Manage your todos at one place</h1>
        <div className="addtodo">
        <h2>Add a Todo</h2>
        <div className='container'>
        <input onChange={handleChange} value={todo} type="text" className='text'/>
        <button onClick={handleAdd} disabled= {todo.length<=1} className='add'>Save</button>
        </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='finished'/> Show Finished
     
      <h2>Your Todos</h2>
       <div className="todos">
       {Todos.length ===0  && <div className='m-5'>No todos to display</div>}
        {Todos.map(item=>{
         return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between flex-nowrap">
          <input  name={item.id} onChange={handlecheckbox} type="checkbox" checked ={item.isCompleted} className='checkbox'/>
          <div id='list'  className={item.isCompleted?"line-through":""}>{item.todo}</div>
          <div className="buttons">
            <button onClick={(e)=>handleEdit(e,item.id)} className='-add'><MdEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='-add'><MdDelete /></button>
           </div>
         </div>  
        })}
       </div>
      </div>
   </>
 )
}

export default App
