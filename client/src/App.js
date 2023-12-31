import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllRoutes from './AllRoutes';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { fetchAllPosts } from './actions/post';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPosts())
  }, [dispatch])
  
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
