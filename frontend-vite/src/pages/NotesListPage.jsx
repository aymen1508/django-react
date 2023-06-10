import {useState,useEffect} from 'react'
import ListItem from '../components/ListItem'
import {Link} from 'react-router-dom'

const NotesListPage = () => {
    let [notes,setNotes] = useState([]);
    useEffect(()=>{
        getNotes()
    },[]);

    useEffect(()=>{

    },[notes])

    let getNotes= async ()=>{
        let response = await fetch('/api/notes/')
        let data=await response.json()
        setNotes(data)
    }

    const handleChildDelete = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <div>
            <h1 className='text-3xl'>Notes List :</h1>
            <div className='flex items-center justify-center'>
                <Link to={'/notes/create/'} className='bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl duration-200 text-xl'>
                    +
                </Link>
            </div>
            <div className='space-y-20 mx-auto w-1/3 p-5 z-0'> 
                {notes.map((note,index)=>(
                    <ListItem note={note} key={index} onDelete={handleChildDelete}/>
                ))}
            </div>
        </div>
    )
}

export default NotesListPage