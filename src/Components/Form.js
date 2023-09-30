import React, { useState } from 'react';
import './Form.css';
import PropTypes from 'prop-types';
import ErrorModal from './ErrorModal';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../graphql/notemaker/mutations';

export default function Form(props) {
  const [noteColor, setNoteColor] = useState(''); // Initialize noteColor state

  const inputHandler = (e) => {
    if (e.target.id === 'title') props.settitle(e.target.value);
    else props.setdesc(e.target.value);
  };

  const colorChangeHandler = (color) => {
    setNoteColor(color); // Update the selected color
  };

  const addNotesHandler = async (e) => {
    e.preventDefault();
    if (props.title !== '' && props.desc !== '') {
      const newNote = {
        title: props.title,
        desc: props.desc,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
        isPinned: false,
        color: noteColor, // Add the color property
      };

      props.setnotes((notes) => [...notes, newNote]);

      try {
        // Use the correct GraphQL mutation operation for creating a note
        await API.graphql(graphqlOperation(createTodo, { input: newNote })); // Use createNote instead of createTodo
        console.log('Note added to the database.');

        // Clear the form fields
        props.settitle('');
        props.setdesc('');
        setNoteColor(''); // Reset the note color after adding
      } catch (error) {
        console.error('Error adding note to the database:', error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1 className='note'>Add a Note</h1>
        <div className="col-md-15">
          <form className="form1">
            <div className="mb">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter your Title"
                value={props.title}
                onChange={inputHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <textarea
                name="desc"
                className="form-control"
                id="desc"
                placeholder="Enter your Description"
                value={props.desc}
                onChange={inputHandler}
              />
            </div>
            {/* Color Picker */}
            
            <div className="color-options">
              <div
                className="c1"
                onClick={() => colorChangeHandler('rgb(255, 70, 70)')}
              ></div>
              <div
                className="c2"
                onClick={() => colorChangeHandler('rgb(255, 165, 0)')}
              ></div>
              <div
                className="c3"
                onClick={() => colorChangeHandler('rgb(255, 255, 0)')}
              ></div>
              <div
                className="c4"
                onClick={() => colorChangeHandler('rgb(63, 213, 63)')}
              ></div>
              <div
                className="c5"
                onClick={() => colorChangeHandler('rgb(76, 76, 220)')}
              ></div>
            </div>
            <button
              type="submit"
              className="btnaddnotes"
              onClick={addNotesHandler}
              {...(props.title === '' || props.desc === ''
                ? {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#exampleModalerror',
                  }
                : {})}
            >
              <span className='addnotesspan'>Add Notes</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
