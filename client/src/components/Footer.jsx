import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-3">
      <Container>
        <Row>
          <Col sm={8}>
            <p className="text-center">
              Copyright &copy; {new Date().getFullYear()}
            </p>
          </Col>
          <Col>
            <p>Б.Өлзиймаа /B200910009/</p>
            <p>Б.Жамц /B200910002/</p>
            <p>Б.Мөнх-Очир /B200910045/</p>
            <p>Э.Өнөболд /B200910028/</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
