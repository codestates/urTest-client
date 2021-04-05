import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { LinkContainer } from "react-router-bootstrap";
import { isLoginVar } from "../../common/graphql/client";

const responseGoogle = (response: any) => {
  console.log(response.tokenObj.id_token);
};

const Signin = () => {
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
                    <h3 className="login-heading mb-4">Urtest</h3>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Button
                        variant="dark"
                        size="lg"
                        block
                        className="btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign In
                      </Button>
                      <GoogleLogin
                        clientId="724060049648-nnacpoao7gftdukk1gurp600rfgme79k.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button
                            onClick={renderProps.onClick}
                            variant="dark"
                            size="lg"
                            block
                            className="btn-login text-uppercase font-weight-bold mb-2"
                            type="submit"
                          >
                            Google
                          </Button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                      <p className="text-inverse text-center">
                        Don`t have an account?
                        <LinkContainer to="/signup">
                          <a> Sign Up</a>
                        </LinkContainer>
                      </p>
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

export default Signin;
