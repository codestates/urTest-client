import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { LinkContainer } from "react-router-bootstrap";
import { isLoginVar } from "../../common/graphql/client";
import { useReactiveVar, gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

const Signin = () => {
  // 전역 변수
  const isLogin = useReactiveVar(isLoginVar);

  // 일반 로그인(토큰 관련 정보 확인, 스테이츠 관리 확인)
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });

  const { user_email, user_password } = inputs;

  const inputHandler = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const POST_SIGNIN = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        ok
        error
        token
      }
    }
  `;
  const [isOk, setIsOk] = useState(true);

  const [login] = useMutation(POST_SIGNIN, {
    onCompleted: (data) => {
      setIsOk(data.login.ok);
      if (data.login.ok === true) {
        localStorage.setItem("token", data.login.token);
        if (localStorage.getItem("token")) {
          isLoginVar(true);
          return;
        }
      }
      return;
    },
  });

  const signinBtnHandler = (e: any) => {
    e.preventDefault();
    login({
      variables: {
        email: user_email,
        password: user_password,
      },
    });
  };

  // 구글 로그인
  const POST_OAUTH_SIGNIN = gql`
    mutation authLogin($googleToken: String!) {
      authLogin(googleToken: $googleToken) {
        ok
        error
        token
      }
    }
  `;

  const [authLogin] = useMutation(POST_OAUTH_SIGNIN, {
    onCompleted: (data) => {
      setIsOk(data.authLogin.ok);
      if (data.authLogin.ok === true) {
        localStorage.setItem("token", data.authLogin.token);
        if (localStorage.getItem("token")) {
          isLoginVar(true);
          return;
        }
      }
      return;
    },
  });

  const responseGoogle = (response: any) => {
    authLogin({
      variables: {
        googleToken: response.tokenObj.id_token,
      },
    });
  };

  // 유저 정보

  return (
    <>
      {isLogin ? <Redirect to="/" /> : ""}
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
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          name="user_email"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          name="user_password"
                        />
                        <Form.Label className="mt-1 text-danger">
                          {isOk ? " " : "* Invalid Email or Password"}
                        </Form.Label>
                      </Form.Group>
                      <Button
                        variant="dark"
                        size="lg"
                        block
                        className="btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                        onClick={(e) => signinBtnHandler(e)}
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
    </>
  );
};

export default Signin;
