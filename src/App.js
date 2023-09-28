import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Notes from './Components/Notes'
import EditModal from './Components/EditModal';
import ErrorModal from './Components/ErrorModal';
import PropTypes from 'prop-types'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Initialize Firestore



export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDKrCILLkRrEGCa8BBZzmRN3vXwAbaE8L4",
    authDomain: "notemaker-400414.firebaseapp.com",
    projectId: "notemaker-400414",
    storageBucket: "notemaker-400414.appspot.com",
    messagingSenderId: "659344805285",
    appId: "1:659344805285:web:638064ae654ca7ffef2c4c",
    measurementId: "G-9WRHZQ6TFL"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  const [title, settitle]=useState("")
  const [desc, setdesc]=useState("")
  const [notes, setnotes]=useState([])
  const [editnotes, seteditnotes]=useState("")
  const [pinned, setPinned] = useState([]);
  // console.log(notes)
  localStorage.setItem("notes",JSON.stringify(notes))
  
  return (
    <>
    <EditModal editnotes={editnotes} notes={notes} seteditnotes={seteditnotes} setnotes={setnotes}></EditModal>
    <Navbar></Navbar>
    <Form title={title} settitle={settitle} desc={desc} setdesc={setdesc} notes={notes} setnotes={setnotes}></Form>
    <Notes  notes={notes} setnotes={setnotes} editnotes={editnotes} seteditnotes={seteditnotes} ></Notes>
    <ErrorModal></ErrorModal>
    </>
  )

  function getnotesfromls(){
    const n=JSON.parse(localStorage.getItem("notes"))
    if(n){
      return n
    }
    else{
      return []
    }
  }

  const saveNote = async () => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        title,
        desc,
        createdAt: new Date().toLocaleString(),
      });
      console.log('Note added with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding note: ', e);
    }
  };

  // Function to retrieve notes from Firestore
  const fetchNotes = async () => {
    const notesQuery = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(notesQuery);
    const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setnotes(notesData);
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, []);


} 
