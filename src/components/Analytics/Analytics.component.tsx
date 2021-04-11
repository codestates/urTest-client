import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Comment from "../Comment/Comment.component";
import CommentItem from "../Comment/CommentItem.component";
import SweetAlert from "react-bootstrap-sweetalert";
import BootstrapTable from "react-bootstrap-table-next";
import { Col, Row, Image, Jumbotron, ProgressBar } from "react-bootstrap";

const GET_CONTENT = gql`
  query getContent($id: Int!) {
    getContent(id: $id) {
      comments {
        contentId
        desc
        id
        password
        updatedAt
      }
      desc
      id
      photos {
        contentId
        id
        photoName
        photoUrl
        winCount
      }
      question {
        answer {
          body
          createdAt
          id
          questionId
          updatedAt
          winCount
        }
        contentId
        questionBody
        id
        updatedAt
      }
      type
      title
      updatedAt
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      error
      ok
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($desc: String!, $id: Int!, $password: String!) {
    addComment(desc: $desc, id: $id, password: $password) {
      error
      ok
    }
  }
`;

const Analytics = (props: any) => {
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [type, setType] = useState("" as any);
  const [imgs, setImgs] = useState([] as any[]);
  const [winCountTotal, setWinCountTotal] = useState(0 as any);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [textTests, setTextTests] = useState([] as any[]);
  const [comments, setComments] = useState([] as any[]);
  const [contentTitle, setContentTitle] = useState("" as any);
  const [contentDesc, setContentDesc] = useState("" as any);
  const [modalId, setModalId] = useState(0 as any);
  const [modalPassword, setModalPassword] = useState("" as any);
  const { refetch } = useQuery(GET_CONTENT, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: async (data) => {
      console.log(data);
      await setType(data.getContent.type);
      await setContentTitle(data.getContent.title);
      await setContentDesc(data.getContent.desc);
      const commentArr = [...data.getContent.comments];
      await commentArr.sort((a: any, b: any) => {
        return +b.updatedAt - +a.updatedAt;
      });
      await setComments(commentArr);
      if (data.getContent.type === "imggame") {
        const imgArr: any = [];
        data.getContent.photos.map((photo: any, idx: number) => {
          imgArr[idx] = {
            id: idx + 1,
            photoId: photo.id,
            photoUrl: photo.photoUrl,
            photoName: photo.photoName,
            winCount: photo.winCount,
          };
        });
        const total = imgArr.reduce(
          (acc: any, cur: any) => +acc + +cur.winCount,
          0
        );
        setWinCountTotal(total);
        setImgs(imgArr);
      }
      if (data.getContent.type === "textgame") {
        await setTextTests(data.getContent.question);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: async () => {
      return refetch();
    },
    refetchQueries: [
      {
        query: GET_CONTENT,
        variables: {
          id: +props.gameid,
        },
      },
    ],
    awaitRefetchQueries: true,
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      setComments(comments.filter((comment) => comment.id !== modalId));
      setModalId(0);
      setModalPassword("");
      return;
    },
  });

  const imageFormatter = (cell: any) => {
    return <Image src={`${cell}`} thumbnail />;
  };

  const ratingFormatter = (cell: any) => {
    if (winCountTotal === 0) {
      return cell;
    }
    if (cell !== 0) {
      const now = Math.ceil((cell / winCountTotal) * 100);
      return (
        <>
          {now < 20 ? (
            <ProgressBar animated now={now} label={`${now}%`} variant="info" />
          ) : now < 40 ? (
            <ProgressBar
              animated
              now={now}
              label={`${now}%`}
              variant="success"
            />
          ) : now < 60 ? (
            <ProgressBar animated now={now} label={`${now}%`} />
          ) : now < 80 ? (
            <ProgressBar
              animated
              now={now}
              label={`${now}%`}
              variant="warning"
            />
          ) : (
            <ProgressBar
              animated
              now={now}
              label={`${now}%`}
              variant="danger"
            />
          )}

          <p>
            [ {cell} / {winCountTotal} ]
          </p>
        </>
      );
    }
  };

  const imgColumns = [
    {
      dataField: "id",
      text: "번호",
      headerStyle: {
        width: "10%",
      },
      headerAlign: "center",
    },
    {
      dataField: "photoUrl",
      text: "사진",
      headerStyle: {
        width: "20%",
      },
      formatter: imageFormatter,
    },
    {
      dataField: "photoName",
      text: "이름",
      sort: true,
    },
    {
      dataField: "winCount",
      text: "승률 [ 우승 / 전체 플레이 ]",
      sort: true,
      formatter: ratingFormatter,
    },
  ];
  const handleCommentDelete = (id: any, password: any) => {
    setSweetAlertShow(true);
    setModalId(id);
    setModalPassword(password);
  };
  const handleCommentAdd = (e: any) => {
    addComment({
      variables: {
        id: +props.gameid,
        password: e.password,
        desc: e.desc,
      },
    });
  };
  return (
    <>
      <Row className="justify-content-md-center mt-4 mx-2">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
          <Jumbotron>
            <h1>{contentTitle}</h1>
            <hr className="my-4"></hr>
            <p>{contentDesc}</p>
          </Jumbotron>
          {type === "imggame" ? (
            <BootstrapTable keyField="id" data={imgs} columns={imgColumns} />
          ) : (
            ""
          )}

          <Comment handleCommentAdd={handleCommentAdd} />

          {comments.length !== 0
            ? comments.map((comment) => {
                return (
                  <CommentItem
                    key={comment.id}
                    id={comment.id}
                    password={comment.password}
                    desc={comment.desc}
                    handleCommentDelete={handleCommentDelete}
                    updatedAt={comment.updatedAt}
                  />
                );
              })
            : ""}
          <SweetAlert
            show={sweetAlertShow}
            input
            required
            confirmBtnText="삭제"
            btnSize="md"
            confirmBtnBsStyle="danger"
            inputType="test"
            title="Enter Password"
            validationMsg="비밀번호를 입력해주세요"
            onConfirm={(e) => {
              if (e === modalPassword) {
                deleteComment({
                  variables: {
                    id: modalId,
                  },
                });
                setSweetAlertShow(false);
              } else {
                setSweetAlertShow(false);
                alert("패스워드가 일치하지 않습니다");
              }
            }}
            onCancel={() => {
              setSweetAlertShow(false);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Analytics;
