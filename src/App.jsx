import {useState,useRef,useEffect} from 'react';

import './App.css'

function App() {
  const [taskName, settaskName] = useState()
 const [tasks, settasks] = useState([]);
  const input = useRef()

  useEffect(() => {
    if(localStorage.getItem("TasksArray")){
      console.log(localStorage.getItem("TasksArray"))
      settasks(JSON.parse(localStorage.getItem("TasksArray")))
     }
  }, [])
  

 useEffect(() => {
     
     localStorage.setItem("TasksArray", JSON.stringify(tasks));
     
    
 }, [tasks])
 

  function handleClick(e){
    e.preventDefault();
    if(taskName.trim().length<1)return
    const newTasks = JSON.parse(JSON.stringify(tasks))
    newTasks.push(taskName)
    settasks(newTasks);
    input.current.value = ""

  }
   
  function handleChange(){
    settaskName(input.current.value)
  }

  function removeTask(index){
    const newTasks = JSON.parse(JSON.stringify(tasks))
    newTasks.splice(index,1)
    settasks(newTasks)

  }

  return (
    <div className='w-screen h-screen bg-teal-600 flex items-center justify-center flex-col gap-3'>
      <form className='flex items-center justify-center gap-2' >
        <input ref={input} onChange={handleChange}  type="text" name="" id="" placeholder='Enter Task' className='rounded p-2 outline-none placeholder:italic placeholder:text-slate-400'/> 
        <button onClick={handleClick} className='flex items-center justify-center w-fit h-6 p-2 rounded bg-green-800 text-white hover:cursor-pointer'> add</button>
      </form>
      <ul className='flex flex-col gap-2'>
          {tasks.map((name,index)=>{
            return (<div  className='flex gap-2'key={index}>
              <li  className='w-52 px-2 py-1 rounded    bg-amber-900/75 text-white font-sans' >{index+1}- {name}</li>
              <button onClick={()=>{
                removeTask(index)
              }} className='bg-transparent rounded h-100 px-1 border-2 border-gray-400 hover:border-gray-500 outline-none'>🗑️</button>
            </div>)
          })}
      </ul>

    </div>
  )
}

export default App
