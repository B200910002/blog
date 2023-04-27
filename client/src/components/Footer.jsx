import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg- py-3">
      <Container>
        <Row>
          <Col>
            <p className="text-center">
              Copyright &copy; {new Date().getFullYear()}
            </p>
            <Row>
              <Col className="col-3">
                Б.Мөнх-Очир /B200910045/
              </Col>
              <Col className="col-3">
                Б.Өлзиймаа /B200910009/
              </Col>
              <Col className="col-3">
                Б.Жамц /B200910002/
              </Col>
              <Col className="col-3">
                Э.Өнөболд /B200910028/
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
