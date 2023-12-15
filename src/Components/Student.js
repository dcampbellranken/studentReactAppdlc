import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';

function Student (props) {
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gradYear, setGradYear] = useState("");

    useEffect(() => {
      setFirstName(props.student.firstName);
      setLastName(props.student.setLastName);
      setEmail(props.student.setEmail);
      setGradYear(props.student.gradYear);
    }, [])

    const saveStudent = () => {
      setEditMode(false);
      const updatedStudent = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gradYear: gradYear,
        id: props.student.id,
        image: props.student.image,
      };
      props.updateStudent(updatedStudent);
    };
    

    return (
        <div className='card'>
            <img className='card-img-top mx-auto'
            src={props.student.image}
            alt='Student Image' 
            />
            {!editMode && (
            <ul className='list-group list-group-flush'>
              <li className='list-group-item text-center fw-bold'>{props.student.firstName}</li>
              <li className='list-group-item text-center fw-bold'>{props.student.lastName}</li>
              <li className='list-group-item text-center'>{props.student.email}</li>
              <li className='list-group-item text-center'>{props.student.gradYear}</li> 
              <button type="button" className="btn btn-danger"
                  onClick={() => props.removeStudent(props.student)}>
                 Delete Student | <FontAwesomeIcon icon={faTrashAlt}/>
              </button>
              <button type="button" className="btn btn-warning"
                  onClick={() => setEditMode(true)}>
                 Edit Student | <FontAwesomeIcon icon={faPencil}/>
              </button>
            </ul>
            )}
            {editMode && (
              <ul className='list-group list-group-flush'>
            <li className='list-group-item text-center'>
              <input type='text' className='formcontrol'
                value={firstName}
                onChange={(evt) =>
                  setFirstName(evt.currentTarget.value)}
              />
            </li>
            <li className='list-group-item text-center'>
              <input type='text' className='formcontrol'
                value={lastName}
                onChange={(evt) =>
                  setLastName(evt.currentTarget.value)}
              />
              
            </li>
            <li className='list-group-item text-center'>
              <input type='email' className='formcontrol'
                value={email}
                onChange={(evt) =>
                  setEmail(evt.currentTarget.value)}
              />
            </li>
            <li className='list-group-item text-center'>
              <input type='text' className='formcontrol'
                value={gradYear}
                onChange={(evt) =>
                  setGradYear(evt.currentTarget.value)}
              />
            </li>
            <li className='list-group-item'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={saveStudent}>
                  Save | <FontAwesomeIcon icon={faSave}/>
              </button>
            </li>
            </ul>
          )}
        </div> 
            );
  }

  export default Student