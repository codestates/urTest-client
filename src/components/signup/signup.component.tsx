import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const Signup = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <Row>
          <Col md={4} lg={6} className="bg-image" />
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto">
                    <h3 className="login-heading mb-4">Sign Up</h3>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nick Name</Form.Label>
                        <Form.Control type="text" placeholder="Nick Name" />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Button
                        variant="dark"
                        size="lg"
                        block
                        className="btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
