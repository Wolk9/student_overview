import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentsList from './features/students/StudentsList'
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Container>
      <center><h3>Student Overview App</h3></center>
        <StudentsList />
        </Container>
    </div>
  );
}

export default App;
