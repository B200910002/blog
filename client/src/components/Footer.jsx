import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-3">
      <Container>
        <Row>
          <Col>
            <p className="text-center">
              Copyright &copy; {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
