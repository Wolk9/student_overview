import React from "react";
import { Card } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";

export const Overview = () => {
  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <Card xs={4}>
          <Card.Header as="h5">Overview</Card.Header>
          <Card.Body>lorem ipsum dolor sit amet, consectet</Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </MDBContainer>
    </div>
  );
};

export default Overview;
