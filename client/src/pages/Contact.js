import React from "react";
import { Fonts } from "../constants/styles";
import { Row, Col } from "react-bootstrap";

export default function Contact() {
  return (
    <div>
      <Row>
        <Col sm={8} style={{ overflowY: "scroll", height: "500px" }}>
          <p style={Fonts.largeDark}>Hi</p>
        </Col>
        <Col sm={4}>
          <p>Contact</p>
        </Col>
      </Row>
    </div>
  );
}
