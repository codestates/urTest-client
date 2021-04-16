import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useReactiveVar, gql, useMutation, useQuery } from "@apollo/client";
import { isLoginVar } from "../../common/graphql/client";
import { useHistory } from "react-router-dom";

const GET_PROFILE = gql`
  query getProfile($id: Int!) {
    getProfile(id: $id) {
      id
      email
    }
  }
`;
const EDIT_PROFILE = gql`
  mutation editProfile($email: String, $password: String, $userName: String) {
    editProfile(email: $email, password: $password, userName: $userName) {
      error
      ok
    }
  }
`;

const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: Int!) {
    deleteAccount(id: $id) {
      error
      ok
    }
  }
`;

const POST_SIGNIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

const Mypage = () => {
  const history = useHistory();
  const isLogin = useReactiveVar(isLoginVar);
  const [email, setEmail] = useState();
  const [inputs, setInputs] = useState({
    user_password: "",
    user_confirm_password: "",
    user_change_password: "",
    user_id: 0,
  });
  const [isOk, setIsOk] = useState(true);
  const [isPwdOk, setPwdOk] = useState(true);

  const [login] = useMutation(POST_SIGNIN, {
    onCompleted: (data) => {
      if (data.login.ok === true) {
        setIsOk(true);
        return;
      }
      setIsOk(false);
      return;
    },
  });
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    onCompleted: () => {
      history.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("uploadObj");
      isLoginVar(false);
      return;
    },
  });
  const [editProfile] = useMutation(EDIT_PROFILE, {
    onCompleted: (data) => {
      if (data.editProfile.ok === true) {
        setSweetAlertShow(true);
        return;
      }
      alert("수정 실패");
      return;
    },
  });
  const token = localStorage.getItem("token");
  if (!token) {
    history.push("/login");
  } else {
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
    useQuery(GET_PROFILE, {
      variables: {
        id: userId,
      },
      onCompleted: (data) => {
        setEmail(data.getProfile.email);
      },
    });
  }
  const { user_password, user_change_password } = inputs;
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    !user_change_password ? setPwdOk(false) : setPwdOk(true);
  };

  const modifyBtnHandler = async (e: any) => {
    e.preventDefault();
    await login({
      variables: {
        email: email,
        password: user_password,
      },
    });

    if (user_change_password.length > 0 && isOk) {
      await editProfile({
        variables: {
          email: email,
          password: user_change_password,
          userName: "null",
        },
      });
    } else {
      setPwdOk(false);
    }
  };

  const deleteBtnHandler = (e: any) => {
    e.preventDefault();
    setDeleteAlertShow(true);
    return;
  };

  return (
    <>
      {!isLogin ? <Redirect to="/login" /> : ""}
      <Row className="justify-content-md-center mt-4 mx-3 vh-92">
        <Col md={7} lg={4} className="bg-image2" />
        <Col md={8} lg={3} className="bg-light rounded pb-4">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <br></br>
              <Form.Label>이메일</Form.Label>
              <Form.Control
                className="font-bgr"
                disabled
                type="email"
                placeholder={email}
                name="user_email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-4">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                className="font-bgr"
                type="password"
                placeholder="Password"
                name="user_password"
                onChange={(e) => inputHandler(e)}
              />
              <Form.Label className="mt-1 text-danger fs-20 font-bgr">
                {isOk ? " " : "* Password 인증에 실패하였습니다"}
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>변경할 비밀번호</Form.Label>
              <Form.Control
                className="font-bgr"
                type="password"
                placeholder="Password"
                name="user_change_password"
                onChange={(e) => inputHandler(e)}
              />
              <Form.Label className="mt-1 text-danger fs-20">
                {isPwdOk ? " " : "변경할 패스워드를 입력해주세요"}
              </Form.Label>
            </Form.Group>
            <Row className="justify-content-between">
              <Button
                variant="dark"
                className="btn-login text-uppercase font-weight-bold mb-4 ml-5 mr-5 w-100"
                type="submit"
                onClick={(e) => deleteBtnHandler(e)}
              >
                회원탈퇴
              </Button>
              <Button
                variant="dark"
                // size="lg"
                className="btn-login2 font-weight-bold mb-3 ml-5 mr-5 w-100"
                type="submit"
                onClick={(e) => modifyBtnHandler(e)}
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
        title="수정완료"
        onConfirm={() => {
          setInputs({
            user_password: "",
            user_confirm_password: "",
            user_change_password: "",
            user_id: 0,
          });
          Array.from(document.querySelectorAll("#formBasicPassword")).forEach(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            (input) => (input.value = "")
          );
          setSweetAlertShow(false);
        }}
        onCancel={() => {
          setInputs({
            user_password: "",
            user_confirm_password: "",
            user_change_password: "",
            user_id: 0,
          });
          Array.from(document.querySelectorAll("#formBasicPassword")).forEach(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            (input) => (input.value = "")
          );
          setSweetAlertShow(false);
        }}
      >
        패스워드가 변경되었습니다.
      </SweetAlert>
      <SweetAlert
        show={deleteAlertShow}
        danger
        title="회원탈퇴"
        confirmBtnBsStyle={"danger"}
        onConfirm={() => {
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
          deleteAccount({
            variables: {
              id: userId,
            },
          });
          setDeleteAlertShow(false);
        }}
        onCancel={() => {
          setDeleteAlertShow(false);
        }}
      >
        정말로 탈퇴하시겠습니까?
      </SweetAlert>
    </>
  );
};

export default Mypage;
