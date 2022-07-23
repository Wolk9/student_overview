import React from "react";
import { Card, Container } from "react-bootstrap";

export const Overview = () => {
  return (
    <div>
      <Container fluid className="p-4 m4">
        <Card xs={4}>
          <Card.Header as="h5">Overview</Card.Header>
          <Card.Body>lorem ipsum dolor sit amet, consectet</Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default Overview;
