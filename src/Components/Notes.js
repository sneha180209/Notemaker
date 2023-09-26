import React from 'react';
import EditModal from './EditModal';
import PropTypes from 'prop-types';
import './Notes.css'

export default function Notes(props) {

  const removehandler=(id)=>{
      const newnotes=props.notes.filter((element) =>{
        if(element.id!==id){
          return element;
        }
      })
      props.setnotes(newnotes)
  }

  const edithandler=(id)=>{
    props.seteditnotes(id)
    props.notes.filter((element)=>{
      if(element.id===id){
        document.getElementById("edittitle").value=element.title;
        document.getElementById("editdesc").value=element.desc;
        
      }
      
    })
    
  }
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col md-10'>
            <h1 className='mb-3 my-5'>Your Notes</h1>

            {props.notes.length === 0 ? (
              <div className="card my-3">
                <div className="card-body">
                  <h5 className="card-title">Message</h5>
                  <p className="card-text">No notes are available for reading.</p>
                  <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                  <button className="btn btn-danger mx-3">Delete</button>
                </div>
              </div>
            ) : (
              props.notes.map((element) => (
                <div className="card my-3" >
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">{element.desc}</p>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    onClick={()=>{edithandler(element.id)}}>Edit</button>
                    <button className="btn btn-danger mx-3" onClick={()=>{
                      removehandler(element.id)}
                    }>Delete</button>
                  </div>
                </div>
              ))
            )
            }
            
          </div>
        </div>
      </div>
      <EditModal></EditModal>
    </>
  );
}
