import React from "react"
import Spinner from "react-bootstrap/Spinner"

export default function Loding_Component({lodingProp}) {
  return (
    <div>
      <span>Loading...</span>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
