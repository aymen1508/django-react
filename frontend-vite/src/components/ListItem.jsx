/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Delete from '../assets/delete.svg';

const ListItem = ({ note, onDelete }) => {
  let handleDelete= async () => {
    onDelete(note.id)
    await fetch('/api/notes/'+note.id+'/', {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
    })
  }
  return (
    <div className="h-20 relative">
      <div className="flex">
        <Link to={'/notes/' + note.id}>
          <h1 className="font-semibold text-xl bg-yellow-600 rounded-t-xl px-3 py-1 w-44">
            {note.title.slice(0, 20)}
          </h1>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-700 hover:bg-red-600 font-bold py-2 px-5 rounded-t-xl duration-200 ml-3"
        >
          <img src={Delete} alt="" />
        </button>
      </div>
      <Link to={'/notes/' + note.id}>
        <h3 className="break-words px-4 py-2 text-lg bg-yellow-800 rounded-tl-none rounded-xl hover:bg-yellow-700 duration-200 h-20 overflow-hidden">
          {note.body.slice(0, 50)}
          {note.body.length > 50 ? '...' : ''}
        </h3>
      </Link>
      <p className="text-sm text-gray-600 px-4 py-2">
        {note.updated_at.slice(0, 10)}
      </p>
    </div>
  );
};

export default ListItem;
