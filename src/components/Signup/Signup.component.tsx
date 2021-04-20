import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";

const Signup = () => {
  // 회원가입
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
    user_confirm_password: "",
  });
  const { user_email, user_password, user_confirm_password } = inputs;

  const inputHandler = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const POST_SIGNUP = gql`
    mutation createAccount(
      $userName: String
      $email: String!
      $password: String!
    ) {
      createAccount(userName: $userName, email: $email, password: $password) {
        ok
        error
      }
    }
  `;
  const [signUpOk, setSignUpOk] = useState(false);

  const [duplication, setDuplication] = useState(false);

  const [createAccount] = useMutation(POST_SIGNUP, {
    onCompleted: (data) => {
      if (data.createAccount.ok === true) {
        setSignUpOk(true);
        return;
      }
      setDuplication(true);
      return;
    },
  });

  const [validation, setValidation] = useState(true);

  const signupBtnHandler = (e: any) => {
    e.preventDefault();
    if (user_password === user_confirm_password) {
      createAccount({
        variables: {
          email: user_email,
          password: user_password,
        },
      });
      setValidation(true);
      return;
    }
    setValidation(false);
    return;
  };

  // 유효성 검사

  return (
    <React.Fragment>
      {signUpOk ? <Redirect to="/login" /> : ""}
      <Container fluid={true} className="login-container">
        <Row className="login-dwn">
          <Col md={7} lg={7} className="bg-image" />
          <Col md={8} lg={4}>
            <Row className="bg-login">
              <Col md={9} lg={8}>
                <h3 className="login-heading mb-4">회원가입</h3>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control
                      className="font-bgr"
                      type="email"
                      placeholder="이메일"
                      name="user_email"
                      onChange={(e) => inputHandler(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                      className="font-bgr"
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      name="user_password"
                      onChange={(e) => inputHandler(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                      className="font-bgr"
                      type="password"
                      placeholder="비밀번호 확인"
                      name="user_confirm_password"
                      onChange={(e) => inputHandler(e)}
                    />
                    <Form.Label className="mt-1 text-danger">
                      {!validation
                        ? "* Confirm Password"
                        : duplication
                        ? "* Email Duplication"
                        : ""}
                    </Form.Label>
                  </Form.Group>
                  <AwesomeButton
                    type="primary"
                    className="text-uppercase mb-2 w-100 font-mg"
                  >
                    <Button
                      variant="urtest"
                      size="lg"
                      // block

                      type="submit"
                      onClick={(e) => signupBtnHandler(e)}
                    >
                      Sign Up
                    </Button>
                  </AwesomeButton>

                  <LinkContainer to="/login">
                    <AwesomeButton
                      type="link"
                      className="mt-2 text-inverse a-urtest w-100"
                    >
                      로그인 하러가기
                    </AwesomeButton>
                  </LinkContainer>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
