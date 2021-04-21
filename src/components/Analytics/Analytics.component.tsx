import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Comment from "../Comment/Comment.component";
import CommentItem from "../Comment/CommentItem.component";
import SweetAlert from "react-bootstrap-sweetalert";
import BootstrapTable from "react-bootstrap-table-next";
import { Col, Row, Image, ProgressBar } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";

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
  const [commAlertShow, setCommAlertShow] = useState(false);
  const [imgSweetAlertSrc, setImgSweetAlertSrc] = useState("");
  const [imgSweetAlertShow, setImgSweetAlertShow] = useState(false);
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
        return;
      }
      if (data.getContent.type === "textgame") {
        const textArr: any = [];
        data.getContent.question.map((question: any, idx: number) => {
          textArr[idx] = {
            id: idx + 1,
            question: question.questionBody,
            answer1: question.answer[0].body,
            answer2: question.answer[1].body,
            answer1Count: question.answer[0].winCount,
            answer2Count: question.answer[1].winCount,
          };
        });
        setTextTests(textArr);
        return;
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
    return (
      <Image
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setImgSweetAlertSrc(e.target.src);
          setImgSweetAlertShow(true);
        }}
        className="thumb"
        src={`${cell}`}
        thumbnail
      />
    );
  };
  const questionFomatter = (cell: any, row: any) => {
    const winTotal = row.answer1Count + row.answer2Count;
    return (
      <>
        <div>{cell}</div>
        <div>투표 수 : {winTotal}</div>
      </>
    );
  };

  const answerRatingFormatter = (cell: any, row: any) => {
    const winTotal = row.answer1Count + row.answer2Count;
    const answer1Rate = Math.ceil((row.answer1Count / winTotal) * 100);
    const answer2Rate = Math.ceil((row.answer2Count / winTotal) * 100);
    return (
      <PieChart
        data={[
          { title: row.answer1, value: answer1Rate, color: "#6bb2ff" },
          { title: row.answer2, value: answer2Rate, color: "#f74a5b" },
        ]}
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        // labelPosition={100 - 60 / 2}
        labelStyle={{
          fill: "#fff",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />
    );
  };
  const answer1RatingFormatter = (cell: any, row: any) => {
    const winTotal = row.answer1Count + row.answer2Count;
    if (winTotal === 0) {
      return cell;
    } else {
      const now = Math.ceil((row.answer1Count / winTotal) * 100);
      return (
        <>
          <p>{cell}</p>
          {/* {now < 50 ? ( */}
          <ProgressBar animated now={now} label={`${now}%`} />
          {/* ) : (
            <ProgressBar
              animated
              now={now}
              label={`${now}%`}
              variant="danger"
            />
          )} */}
          <p>[ {row.answer1Count} ]</p>
        </>
      );
    }
  };
  const answer2RatingFormatter = (cell: any, row: any) => {
    const winTotal = row.answer1Count + row.answer2Count;
    if (winTotal === 0) {
      return cell;
    } else {
      const now = Math.ceil((row.answer2Count / winTotal) * 100);
      return (
        <>
          <p>{cell}</p>
          {/* {now < 50 ? (
            <ProgressBar animated now={now} label={`${now}%`} />
          ) : ( */}
          <ProgressBar animated now={now} label={`${now}%`} variant="danger" />
          {/* )} */}

          <p>[ {row.answer2Count} ]</p>
        </>
      );
    }
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

  const textColumns = [
    // {
    //   dataField: "id",
    //   text: "번호",
    //   headerStyle: {
    //     width: "10%",
    //   },
    //   headerAlign: "center",
    // },
    {
      dataField: "question",
      text: "질문",
      headerStyle: {
        width: "30%",
      },
      formatter: questionFomatter,
    },
    {
      dataField: "answer1",
      text: "답변1",
      headerStyle: {
        width: "30%",
      },
      formatter: answer1RatingFormatter,
    },
    {
      dataField: "answer2",
      text: "답변2",
      headerStyle: {
        width: "30%",
      },
      formatter: answer2RatingFormatter,
    },
    {
      dataField: "answer",
      text: "승률",
      headerStyle: {
        width: "30%",
      },
      formatter: answerRatingFormatter,
    },
  ];

  const imgColumns = [
    // {
    //   dataField: "id",
    //   text: "번호",
    //   headerStyle: {
    //     width: "10%",
    //   },
    //   headerAlign: "center",
    // },
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
      classes: "wordbreak",
      headerStyle: {
        width: "30%",
      },
    },
    {
      dataField: "winCount",
      text: "승률 [ 우승 / 전체 플레이 ]",
      sort: true,
      headerStyle: {
        width: "50%",
      },
      formatter: ratingFormatter,
    },
  ];

  const handleCommentDelete = (id: any, password: any) => {
    setSweetAlertShow(true);
    setModalId(id);
    setModalPassword(password);
  };
  const handleCommentAdd = (e: any) => {
    if (!e.desc || !e.password) {
      return alert("공백을 채워주세요");
    }
    addComment({
      variables: {
        id: +props.gameid,
        password: e.password,
        desc: e.desc,
      },
    });
    setCommAlertShow(true);
    return;
  };
  return (
    <>
      <Row className="justify-content-md-center mt-4 mx-2">
        <Col md={8} className="rounded pt-3 pb-3">
          <h1 className="font-bgr-b">{contentTitle}</h1>
          <hr className="my-2"></hr>
          <p className="font-bgr">{contentDesc}</p>
          {type === "imggame" ? (
            <BootstrapTable
              keyField="id"
              data={imgs}
              columns={imgColumns}
              defaultSorted={[
                {
                  dataField: "winCount",
                  order: "desc",
                },
              ]}
            />
          ) : (
            <BootstrapTable
              keyField="id"
              data={textTests}
              columns={textColumns}
            />
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
          <SweetAlert
            title=""
            show={imgSweetAlertShow}
            showConfirm={false}
            onConfirm={() => {
              setImgSweetAlertShow(false);
            }}
            onCancel={() => {
              setImgSweetAlertShow(false);
            }}
          >
            <Image src={`${imgSweetAlertSrc}`} className="w-100" />
          </SweetAlert>
          <SweetAlert
            title=""
            success
            show={commAlertShow}
            showConfirm={false}
            onConfirm={() => {
              setCommAlertShow(false);
              window.location.reload();
              return;
            }}
            onCancel={() => {
              setCommAlertShow(false);
              window.location.reload();
              return;
            }}
          >
            댓글 작성 완료
          </SweetAlert>
        </Col>
      </Row>
    </>
  );
};

export default Analytics;
