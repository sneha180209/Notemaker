// Archive.js
import React from 'react';

function Archive(props) {
  if (!Array.isArray(props.setarchivenotes)) {
    return <div>Hi</div>; // or handle the case where it's not an array
  } else {
    return (
      <div className="gridstyle">
        {props.setarchivenotes.map((element) => (
          <div className="card my-0" key={element.id} style={{ backgroundColor: element.color }}>
            <div className="card-body">
              <h2>{new Date(element.createdAt).toLocaleString()}</h2>
              <h5 className="card-title">{element.title}</h5>
              <p className="card-text">{element.desc}</p>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
              </button>
              <button className="btn btn-danger mx-3">Delete</button>
              <button className="btn btn-warning">
                {/* {element.isPinned ? "Unpin" : "Pin"} */}
              </button>
              <button className='btn btn-dark mx-3'>
                {/* onClick={() => { */}
                {/*   archive(element.id); */}
                {/* }} */}
              Archive</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Archive;
