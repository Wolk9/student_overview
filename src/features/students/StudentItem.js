import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';


const StudentItem = ({ id, name, age, gender }) => {
    const dispatch = useDispatch();

    return (
        <div><td>{id}</td>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{age}</td>
        </div>
    )
}

export default StudentItem