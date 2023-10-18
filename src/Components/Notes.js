import React, { useState } from 'react';
import EditModal from './EditModal';
import PropTypes from 'prop-types';
import './Notes.css';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteTodo } from '../graphql/notemaker/mutations';

export default function Notes(props) {
  // const archive=[];
  const [archivenotes, setarchivenotes] = useState([]);
  

  const notesPerPage = 6; // Maximum notes per page

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = props.notes.slice(indexOfFirstNote, indexOfLastNote);

  const removehandler = async (id) => {
    // Remove the note from the local state first
    const newnotes = props.notes.filter((element) => element.id !== id);
    props.setnotes(newnotes);

    try {
      // Use the GraphQL mutation to delete the note from the database
      await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
      console.log('Note deleted from the database.');
    } catch (error) {
      console.error('Error deleting note from the database:', error);
    }
  };

  const archive=async(id) =>{
    const anotes = props.notes.filter((element) => element.id !== id);
    setarchivenotes(anotes);
    props.setnotes(anotes);
    console.log(archivenotes);
  
  }

  const edithandler = (id) => {
    props.seteditnotes(id);
    props.notes.filter((elem) => {
      if (elem.id === id) {
        document.getElementById('edittitle').value = elem.title;
        document.getElementById('editdesc').value = elem.desc;
      }
    });
  };

  const togglePin = (id) => {
    const updatedNotes = props.notes.map((elem) => {
      if (elem.id === id) {
        return { ...elem, isPinned: !elem.isPinned };
      }
      return elem;
    });

    props.setnotes(updatedNotes);
  };

  const sortedNotes = [...currentNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) {
      return -1;
    }
    if (!a.isPinned && b.isPinned) {
      return 1;
    }
    // Sort by creation date if both are pinned or both are not pinned
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.notes.length / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="container" id="c1">
        <div className="row justify-content-center">
          <div className="col md-5">
            <h1 className="mb-3 my-3">Your Notes</h1>

            {sortedNotes.length === 0 ? (
              <div className="card my-3">
                <div className="card-body">
                  <h5 className="card-title">Message</h5>
                  <p className="card-text">No notes are available for reading.</p>
                </div>
              </div>
            ) : (
              <div class="gridstyle">
              {sortedNotes.map((element) => (
                <div className="card my-0" key={element.id} style={{ backgroundColor: element.color }}>
                  <div className="card-body">
                  <h2>{new Date(element.createdAt).toLocaleString()}</h2>

                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">{element.desc}</p>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        edithandler(element.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => {
                        removehandler(element.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        togglePin(element.id);
                      }}
                    >
                      {element.isPinned ? "Unpin" : "Pin"}
                    </button>
                    <button className='btn btn-dark mx-3'
                    onClick={() => {
                      archive(element.id);
                    }}>Archive</button>
                  </div>
                </div>
              ))}
              </div>
            )}
            <nav>
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${number === currentPage ? "active" : ""}`}
                  >
                    <button
                      onClick={() => setCurrentPage(number)}
                      className="page-link"
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <EditModal></EditModal>
    </>
  );
}
