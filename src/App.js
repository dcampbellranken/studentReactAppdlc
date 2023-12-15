import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './App.css';
import './Components/Student.css' 

import AddStudent from './Components/AddStudent'
import Student from "./Components/Student"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  // React hook
  const [allStudents, setAllStudents]     = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeyWords]           = useState("");
  const [gradYear, setGradYear]           = useState("");

// Seed Data
const students = 
[
  {
    id:nanoid(),
    "firstName": "Dannye",
    "lastName": "Nightingale",
    "email": "dnightingale0@sogou.com",
    image: 'images/student1.jpg',
    gradYear: 2020
  }, 
  {
    id:nanoid(),
    "firstName": "Lacee",
    "lastName": "Klimshuk",
    "email": "lklimshuk1@go.com",
    image: 'images/student2.jpg',
    gradYear: 2020
  }, 
  {
    id:nanoid(),
    "firstName": "Kamilah",
    "lastName": "Tarren",
    "email": "ktarren2@creativecommons.org",
    image: 'images/student3.jpg',
    gradYear: 2020
  }, 
  {
    id:nanoid(),
    "firstName": "Crystal",
    "lastName": "Shevell",
    "email": "cshevell3@chicagotribune.com",
    image: 'images/student4.jpg',
    gradYear: 2021
  }, 
  {
    id:nanoid(),
    "firstName": "Danell",
    "lastName": "Weepers",
    "email": "dweepers4@newsvine.com",
    image: 'images/student5.jpg',
    gradYear: 2021
  }, 
  {
    id:nanoid(),
    "firstName": "Raquel",
    "lastName": "Gayforth",
    "email": "rgayforth5@admin.ch",
    image: 'images/student6.jpg',
    gradYear: 2022
  }, 
  {
    id:nanoid(),
    "firstName": "Bordy",
    "lastName": "Barbary",
    "email": "bbarbary6@diigo.com",
    image: 'images/student7.jpg',
    gradYear: 2022
  },
   {
    id:nanoid(),
    "firstName": "Sheelagh",
    "lastName": "Ciobotaro",
    "email": "sciobotaro7@theglobeandmail.com",
    image: 'images/student8.jpg',
    gradYear: 2023
  }, 
  {
    id:nanoid(),
    "firstName": "Olly",
    "lastName": "Kopelman",
    "email": "okopelman8@youtu.be",
    image: 'images/student9.jpg',
    gradYear: 2023
  }, 
  {
    id:nanoid(),
    "firstName": "Jard",
    "lastName": "Worshall",
    "email": "jworshall9@cafepress.com",
    image: 'images/student10.jpg',
    gradYear: 2024
  }
];

useEffect(() =>
{
  saveStudents(students);
}, []);

const saveStudents = (students) => {
  setAllStudents(students);
  setSearchResults(students);
};

const searchStudents = () => {
  let keywordsArray = [];

  if (keywords)
  {
    keywordsArray = keywords.toLowerCase().split(' ');
  }

  if (gradYear)
  {
    keywordsArray.push(gradYear.toString());
  }

  if (keywordsArray.length > 0)
  {
    const searchResults = allStudents.filter( student => {
      for (const word of keywordsArray)
      {
        if (student.firstName.toLowerCase().includes(word) ||
            student.lastName.toLowerCase().includes(word) ||
            student.gradYear === parseInt(word)
           ) {
          return true;
             }
      }
      return false;
    });

    setSearchResults(searchResults);
  }
  else {
    setSearchResults(allStudents);
  }
};
// Add New Student
const addStudent = (newStudent) => {
  const updatedStudents = [...allStudents, newStudent];
  saveStudents(updatedStudents);
};
// Remove Existing Student
const removeStudent = (studentToDelete) => {
  const updatedStudentsArray = allStudents.filter(
    (student) => student.id != studentToDelete.id
  );
  saveStudents(updatedStudentsArray);
};

const updateStudent = (updatedStudent) => {
  const updatedStudentsArray = allStudents.map((student) =>
    student.id === updatedStudent.id
      ? { ...student, ...updatedStudent }
      : student
    );

    saveStudents(updatedStudentsArray);
};

  return (
    <div className="container">
      <div className="row" id='currentStudents'>
        <h3 id='currentStudentHeader'>Current Students</h3>
        {searchResults &&
          searchResults.map((student) => (
          <div className="col-lg-2" key={student.id}>
            <Student student={student}
             removeStudent={removeStudent}
             updateStudent={updateStudent}
            />
          </div> 
        ))}
      </div>
      
      <AddStudent addStudent={addStudent} />

      <div className='row mt-4' id='searchStudent'>
        <h3 id='searchStudentHeader'>Search For Student</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>
            Search by First or Last Name
          </label>
          <input type='text'
                 className='form-control'
                 placeholder='Name Here'
                 onChange={evt => setKeyWords(evt.currentTarget.value)}
                 value={keywords}
          />
        </div>
        
        <div className='col-md-4'>
        <label htmlFor='txtKeywords'>
            Search by Graduation Year
          </label>
          <select value={gradYear} className='form-select' 
                  onChange={evt => setGradYear(evt.currentTarget.value)}
          >
            <option value="">Select Grad Year</option>
            {_(allStudents)
              .map((student) => student.gradYear)
              .sort()
              .uniq()
              .map((year) => (
               <option key={year} value={year}>
                 {year}
              </option>
              ))
              
              .value()}
          </select>
        </div>

        <div className='col-md-4'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={searchStudents}>Search <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
