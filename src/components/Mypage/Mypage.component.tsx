import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useReactiveVar, gql, useMutation } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { useHistory } from "react-router-dom";

const Mypage = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
    user_confirm_password: "",
    user_id: 0,
  });
  const [userId, setUserId] = useState();
  const { user_email, user_password, user_confirm_password } = inputs;
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const isLogin = useReactiveVar(isLoginVar);

  const [duplication, setDuplication] = useState(false);
  const [validation, setValidation] = useState(true);
  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const modifyBtnHandler = (e: any) => {
    e.preventDefault();
    if (user_password === user_confirm_password) {
      const token = localStorage.getItem("token");
      const userId = jwt.verify(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        token,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        process.env.REACT_APP_SECRET_KEY,
        function (err: any, decoded: any) {
          return decoded.id;
        }
      );
      console.log(userId);
      console.log("통과");
      setValidation(true);
      return;
    }
    setValidation(false);
    return;
  };
  const deleteBtnHandler = (e: any) => {
    e.preventDefault();
    if (user_password === user_confirm_password) {
      const token = localStorage.getItem("token");
      const userId = jwt.verify(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        token,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        process.env.REACT_APP_SECRET_KEY,
        function (err: any, decoded: any) {
          return decoded.id;
        }
      );
      console.log(userId);
      console.log("통과");
      setValidation(true);
      return;
    }
    setValidation(false);
    return;
  };

  return (
    <>
      {!isLogin ? <Redirect to="/" /> : ""}
      <Row className="justify-content-md-center mt-4">
        <Col md={8} className="bg-light rounded pb-4">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                disabled
                type="email"
                placeholder="Email"
                name="user_email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="user_password"
                onChange={(e) => inputHandler(e)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
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
            <Row className="justify-content-between">
              <Button
                variant="warning"
                size="lg"
                className="btn-login text-uppercase font-weight-bold mb-2 ml-5"
                type="submit"
                onClick={(e) => modifyBtnHandler(e)}
              >
                회원탈퇴
              </Button>
              <Button
                variant="dark"
                size="lg"
                className="btn-login text-uppercase font-weight-bold mb-2 mr-5"
                type="submit"
                onClick={(e) => deleteBtnHandler(e)}
              >
                수정하기
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="완료완료"
        onConfirm={() => {
          history.push("/");
        }}
        onCancel={() => {
          history.push("/");
        }}
      >
        홈으로 이동합니다
      </SweetAlert>
    </>
  );
};

export default Mypage;
