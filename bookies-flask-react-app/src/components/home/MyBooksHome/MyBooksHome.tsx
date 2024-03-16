import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function MyBooksHome() {
  return (
    <MDBCard alignment='center'>
      <MDBCardBody>
        <MDBCardTitle>Currently Reading</MDBCardTitle>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
        <MDBCardTitle>Up Next</MDBCardTitle>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
      </MDBCardBody>
    </MDBCard>
  );
}