import Header from './components/Header';
import NotePage from './pages/NotePage';
import NotesListPage from './pages/NotesListPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App">
        <div className='sticky top-0 z-50'>
          <Header title="Notes App"/>
        </div>
        <div className='px-10 py-5'>
          <Routes>
            <Route path="/" exact Component={NotesListPage} />
            <Route path="/notes/:id/" Component={NotePage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
