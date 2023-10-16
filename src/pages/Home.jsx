import React from 'react'
import EditModal from '../Components/EditModal'
import Form from '../Components/Form'
import Notes from '../Components/Notes'
import ErrorModal from '../Components/ErrorModal'

function Home(props) {
  return (
    <>
    <EditModal title={props.title} settitle={props.settitle} desc={props.desc} setdesc={props.setdesc} editnotes={props.editnotes} notes={props.notes} seteditnotes={props.seteditnotes} setnotes={props.setnotes}></EditModal>
    <Form title={props.title} settitle={props.settitle} desc={props.desc} setdesc={props.setdesc} notes={props.notes} setnotes={props.setnotes}></Form>
    {props.notes && (<Notes notes={props.notes} setnotes={props.setnotes} editnotes={props.editnotes} seteditnotes={props.seteditnotes}/>)}
    <ErrorModal></ErrorModal> 
    </>

  )
}

export default Home
