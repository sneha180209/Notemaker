import React from 'react'
import PropTypes from 'prop-types'
import { API, graphqlOperation } from 'aws-amplify';
import { updateTodo, deleteTodo } from '../graphql/notemaker/mutations';
export default function EditModal(props) {
    const updatehandler = async () => {
      const updatedNote = {
        id: props.editnotes,
        title: document.getElementById("edittitle").value,
        desc: document.getElementById("editdesc").value,
        
      };
      // console.log('hi')
  
      try {
        // Use the GraphQL mutation to update the note in the database
        await API.graphql(graphqlOperation(updateTodo, { input: updatedNote }));
        console.log('Note updated in the database.');
  
        // Update the local state with the updated note
        const updatedNotes = props.notes.map((elem) => {
          if (elem.id === props.editnotes) {
            return { ...elem, ...updatedNote };
          }
          return elem;
        });
  
        props.setnotes(updatedNotes);
      } catch (error) {
        console.error('Error updating note in the database:', error);
      }
    };
  
  return (
    <>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label forhtml="title" className="col-form-label">Title</label>
                    <input type="text" className="form-control" id="edittitle" placeholder="Edit your Title"/>
                  </div>
                  <div className="mb-3">
                    <label forhtml="desc" className="col-form-label">Description</label>
                    <textarea name="desc" className="form-control" id="editdesc" placeholder="Edit your Description"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updatehandler}>Save</button>
              </div>
            </div>
          </div>
        </div>
        
    </>
  )
}