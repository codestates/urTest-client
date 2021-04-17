import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { LinkContainer } from "react-router-bootstrap";
import { isLoginVar } from "../../common/graphql/client";
import { useReactiveVar, gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

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
      {/* <Image src="http://drive.google.com/uc?export=view&id=1HJXOSa1lG4wdPpGLHeZV6ciiU6-O3hv_" roundedCircle/> */}
      {/* <Col xs={6} md={5}>
            <Image src="undraw.svg" thumbnail/>
         </Col> */}
      {/* http://drive.google.com/uc?export=view&id=1HJXOSa1lG4wdPpGLHeZV6ciiU6-O3hv_ */}

      {isLogin ? <Redirect to="/" /> : ""}
      <Container fluid={true}>
        <Row  className="login-dwn">
          <Col md={7} lg={8} className="bg-image mt-8" />
          <Col md={8} lg={4}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={8} lg={7} className="mx-auto">
                    <h2 className="login-heading mb-4">Welcome !</h2>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className="form-label"></Form.Label>
                        <Form.Control
                          className="font-bgr"
                          // size="lg"
                          type="email"
                          placeholder="이메일"
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          name="user_email"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label></Form.Label>
                        <Form.Control
                          className="font-bgr"
                          // size="lg"
                          type="password"
                          placeholder="비밀번호를 입력하세요"
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          name="user_password"
                        />
                        <Form.Label className="mt-1 text-danger">
                          {isOk ? " " : "* Invalid Email or Password"}
                        </Form.Label>
                      </Form.Group>
                      <AwesomeButton
                        type="secondary"
                        className="btn-login text-uppercase mb-2 w-100 font-mg"
                      >
                        <Button
                          variant="urtest"
                          // size="lg"
                          // block

                          type="submit"
                          onClick={(e) => signinBtnHandler(e)}
                        >
                          로그인
                        </Button>
                      </AwesomeButton>
                      <GoogleLogin
                        clientId="724060049648-nnacpoao7gftdukk1gurp600rfgme79k.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <AwesomeButton
                            type="primary"
                            className="btn-login2 mb-2 w-100 font-mg font-size-1-2"
                          >
                            <Button
                              onClick={renderProps.onClick}
                              variant="urtest"
                              type="submit"
                            >
                              Google
                            </Button>
                          </AwesomeButton>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                      <p className="text-inverse text-center w-100">
                        <LinkContainer to="/signup">
                          <a className=" textlink"> 회원가입</a>
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
