import React from 'react'
import PropTypes from 'prop-types'
export default function EditModal(props) {
  // props.seteditnotes(id)
  const updatehandler = () =>{
    const un=props.notes.map((elem)=>{
      if(props.editnotes===elem.id){
        return({...elem,
          title:document.getElementById("edittitle").value,
          desc:document.getElementById("editdesc").value
      })
        
      }
      else{
        return elem;
      }
    })
    // console.log(un) 
    props.setnotes(un)
  }
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