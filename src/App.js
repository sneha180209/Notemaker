import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Notes from './Components/Notes';
import EditModal from './Components/EditModal';
import ErrorModal from './Components/ErrorModal';
import Archive from './pages/Archive'
import Home from './pages/Home'
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/notemaker/mutations';
import { listTodos } from './graphql/notemaker/queries';
import './App.css';
// import ParticleBackground from './ParticleBackground';

Amplify.configure(awsconfig);

export default function App() {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [notes, setnotes] = useState([]);
  const [editnotes, seteditnotes] = useState('');
  const [pinned, setPinned] = useState([]);
  const [archivenotes, setarchivenotes] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  let d=document.querySelector(".img1");
  let l=document.querySelector(".img2");
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const d = document.querySelector('.img1');
    const b = document.querySelector('.img2');
  
    if (b.style.left === "-30px" || b.style.left === "") {
      d.style.visibility = "visible";
      d.style.left = "30px";
      b.style.visibility = "hidden";
      b.style.left = "30px";
      
    }
    
    else if(d.style.left==="30px" || d.style.left==="") {
      b.style.visibility = "visible";
      b.style.left = "-30px";
      d.style.left = "-30px";
      d.style.visibility = "hidden";
  
    }
  };
  
  

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    fetchNotes(); // Call the fetchNotes function here if you want to fetch notes on mount
  }, [darkMode]); // Specify the dependency array containing only 'darkMode'
  

  const saveNote = async () => {
    try {
      const newNote = {
        title,
        desc,
        createdAt: new Date().toISOString(),
      };

      // Use GraphQL mutation to create a new note
      await API.graphql(graphqlOperation(createTodo, { input: newNote }));

      // Clear the input fields
      settitle('');
      setdesc('');
    } catch (e) {
      console.error('Error adding note: ', e);
    }
  };

  const fetchNotes = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listTodos));
      const notesData = result.data.listTodos.items;
      setnotes(notesData);
    } catch (e) {
      console.error('Error fetching notes: ', e);
    }
  };

  // Rest of your component code remains the same

  return (
    <>
    {/* <button onClick={toggleDarkMode}>Toggle Dark Mode</button> */}
      <Router>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
        <Routes>
          <Route path='/home' element={<Home title={title} settitle={settitle} desc={desc} setdesc={setdesc} notes={notes} setnotes={setnotes} editnotes={editnotes} seteditnotes={seteditnotes} pinned={pinned} setPinned={setPinned} archivenotes={archivenotes} setarchivenotes={setarchivenotes}/>} />
          <Route path='/archive' element={<Archive archivenotes={archivenotes} setarchivenotes={setarchivenotes} />} />  
        </Routes>
      </Router>

    </>
  );
}
