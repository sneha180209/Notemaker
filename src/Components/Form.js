import React from 'react'
import './Form.css'
import PropTypes from 'prop-types'

export default function Form(props) {
    const inputhandler = (e)=>{
        if(e.target.id==="title")
            props.settitle(e.target.value);
        else 
            props.setdesc(e.target.value);
        console.log(props.title, props.desc);
    }

    const addnoteshandler = (e) =>{
        e.preventDefault()
        props.setnotes((notes) => {
            return(
            [...notes,{
            title:props.title,
            desc:props.desc
        }]
        )
    })
    props.settitle("");
    props.setdesc("");
    
    }
    
    
    
  return (
    <>
        <div className="container">
            <h1>Add a Note</h1> 
                <div className="col-md-10">
                    <form className='form1'>
                        <div className="mb-3">
                            <label forhtml="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" placeholder='Enter your Title' value={props.title} 
                            onChange={inputhandler}/>
                        </div>
                        <div className="mb-3">
                            <label forhtml="desc" className="form-label">Description</label>
                            <textarea name="desc"className="form-control" id="desc" placeholder="Enter your Description" value={props.desc}
                                onChange={inputhandler}/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={addnoteshandler}>Add Notes</button>
                    </form>
                </div>
         </div>
    </>
  )
}
