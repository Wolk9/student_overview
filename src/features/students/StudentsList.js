import React from 'react'
import { Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StudentItem from './StudentItem'

const StudentsList = () => {
    const students = useSelector((state) => state.students);


    return (
        
        <Table>
                <thead>
                    <tr>
                        <th>id</th><th>name</th><th>gender</th><th>age</th>
                    </tr>
            </thead>
            <tbody>
                
            {students.map((student) => (
                      <tr>  
                    <StudentItem id={student.id} name={student.name} gender={student.gender} age={student.age} />
                    </tr>
			        ))}
                </tbody>
            </Table>
            
           
)


}

export default StudentsList