import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Notes from './Components/Notes'
import EditModal from './Components/EditModal';
import ErrorModal from './Components/ErrorModal';
import PropTypes from 'prop-types'

export default function App() {

  const [title, settitle]=useState("")
  const [desc, setdesc]=useState("")
  const [notes, setnotes]=useState([])
  const [editnotes, seteditnotes]=useState("")
  // console.log(notes)
  localStorage.setItem("notes",JSON.stringify(notes))

  return (
    <>
    <EditModal notes={notes} setnotes={setnotes} editnotes={editnotes} seteditnotes={seteditnotes}></EditModal>
    <Navbar></Navbar>
    <Form title={title} settitle={settitle} desc={desc} setdesc={setdesc} notes={notes} setnotes={setnotes}></Form>
    <Notes notes={notes} setnotes={setnotes} editnotes={editnotes} seteditnotes={seteditnotes}></Notes>
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
} 
