import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Notes from './Components/Notes'
import EditModal from './Components/EditModal';
import PropTypes from 'prop-types'

export default function App() {

  const [title, settitle]=useState("")
  const [desc, setdesc]=useState("")
  const [notes, setnotes]=useState([])

  return (
    <>
    <EditModal></EditModal>
    <Navbar></Navbar>
    <Form title={title} settitle={settitle} desc={desc} setdesc={setdesc} notes={notes} setnotes={setnotes}></Form>
    <Notes notes={notes}></Notes>
    </>
  )
} 
