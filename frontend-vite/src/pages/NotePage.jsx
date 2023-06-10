import { useEffect, useState } from 'react'
import { useMatch,useNavigate} from 'react-router-dom'
import LeftArrow from '../assets/left-arrow.svg'
import Delete from '../assets/delete.svg'
import Checkmark from '../assets/checkmark.svg'

const NotePage = () => {
  const match = useMatch('/notes/:id/')
  let navigate=useNavigate()
  const noteId = match.params.id
  let [note, setNote] = useState(null)
  useEffect(() => {
    getNote()
  },[match])
  let getNote= async () => {
    if (noteId=='create') return
    let response=await fetch('/api/notes/'+noteId+'/')
    let data=await response.json()
    setNote(data)
  }
  let updateNote= async () => {
    await fetch('/api/notes/'+noteId+'/', {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(note)
    })
  }
  let deleteNote= async () => {
    await fetch('/api/notes/'+noteId+'/', {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
    })
    navigate('/')
  }
  let createNote= async ()=>{
    let data=JSON.stringify(note)
    console.log(data);
    await fetch('/api/notes/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:data
    })
}
let handleExit = () => {
  if (noteId!=='create' && (note?.body || note?.title)){
    updateNote()
  }else if (noteId !== 'create' &&  !note?.body && !note?.title) {
    deleteNote()
  }
  navigate('/');
};
let handleConfirm=()=>{
  if (note.body || note.title) createNote();
  else {alert("Error"); return;}
  navigate('/')
}
let handleChange=(e)=>{
  setNote({...note, body:e.target.value})
}
  return (
    <div className='w-1/2 mx-auto'>
      <div className="flex justify-between p-3">
        <div className='p-1'>
        <span className='inline-block mr-3 hover:cursor-pointer' onClick={handleExit}>
          <img src={LeftArrow} alt="" />
        </span>
        <span className='text-xl inline-block'> Note {note?.id} :</span>
        </div>
        {noteId=='create' ? <div onClick={handleConfirm} className=' h-min p-3 hover:bg-green-800 hover:cursor-pointer duration-200  text-xl rounded-xl bg-green-900'>
        <img src={Checkmark} alt="" />
        </div>:null}
        
      </div>
      <div className='flex'>
        <input type='text' onBlur={(e)=>{setNote({...note, title:e.target.value})}} className='font-semibold text-xl bg-yellow-600 rounded-t-xl w-max px-3 py-1' defaultValue={note?.title}/>
        {noteId!=='create' &&
        <div className='flex justify-center'>
          <button onClick={deleteNote} className=" bg-red-700 hover:bg-red-600 font-bold py-2 px-5 rounded-t-xl duration-200 ml-3">
            <img src={Delete} alt="" />
          </button>
        </div>
        }
      </div>
      <textarea className='px-4 py-3 bg-yellow-800 rounded-tl-none rounded-xl text-lg break-words w-full' onBlur={(e)=>{handleChange(e)}} rows={10} defaultValue={note?.body} />
    </div>
  )
}

export default NotePage