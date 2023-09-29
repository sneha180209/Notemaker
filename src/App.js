import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Notes from './Components/Notes';
import EditModal from './Components/EditModal';
import ErrorModal from './Components/ErrorModal';
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

  const [darkMode, setDarkMode] = useState(false);

  let d=document.querySelector(".img1");
  let l=document.querySelector(".img2");
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if(l.style.left==="-30px" || l.style.left===""){
      d.style.left="30px";
      l.style.visibility="hidden";
      l.style.left="30px"
      d.style.visibility="visible";
    }
    else if(d.style.left==="30px" || d.style.left==="")
    {
      l.style.visibility="visible";
      l.style.left="-30px";
      d.style.left="-30px";
      // l.style.left="-30px";
      d.style.visibility="hidden";
    }
    // else{
    //   d.style.left="-30px";
    //   l.style.visibility="visible";
    //   // d.style.visibility="hidden";
    //   // l.style.left="30px";
    // }
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
      <EditModal editnotes={editnotes} notes={notes} seteditnotes={seteditnotes} setnotes={setnotes}></EditModal>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
      <Form title={title} settitle={settitle} desc={desc} setdesc={setdesc} notes={notes} setnotes={setnotes}></Form>
      <Notes notes={notes} setnotes={setnotes} editnotes={editnotes} seteditnotes={seteditnotes}></Notes>
      <ErrorModal></ErrorModal>
    </>
  );
}
