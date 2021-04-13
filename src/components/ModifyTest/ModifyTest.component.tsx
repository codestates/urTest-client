import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import { Col, Row, Button, Image } from "react-bootstrap";
import { useReactiveVar } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";
import { Redirect, useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import jwt from "jsonwebtoken";

// 쿼리
const GET_CONTENTS = gql`
  query getContent($id: Int!) {
    getContent(id: $id) {
      userId
      photos {
        id
        photoUrl
        photoName
      }
      title
      desc
    }
  }
`;

const EDTI_PHOTONAME = gql`
  mutation editPhotoName($id: Int!, $photoName: String) {
    editPhotoName(id: $id, photoName: $photoName) {
      error
      ok
    }
  }
`;

const ModifyTest = (props: any) => {
  const history = useHistory();
  const uploadObjStr = localStorage.getItem("uploadObj");
  const input = useReactiveVar(inputVar);
  const [sweetAlertShow, setSweetAlertShow] = useState(false);
  const [contentFiles, setContentFiles] = useState([] as any);
  const [editPhotoName] = useMutation(EDTI_PHOTONAME, {
    onCompleted: (data) => {
      console.log(data);
      return;
    },
  });
  const uploadObj = uploadObjStr
    ? JSON.parse(uploadObjStr)
    : {
        title: "",
        desc: "",
        files: [],
        textTest: [
          { id: "1", question: "질문1", answer1: "답변1", answer2: "답변2" },
          { id: "2", question: "질문2", answer1: "답변1", answer2: "답변2" },
          { id: "3", question: "질문3", answer1: "답변1", answer2: "답변2" },
          { id: "4", question: "질문4", answer1: "답변1", answer2: "답변2" },
          { id: "5", question: "", answer1: "", answer2: "" },
          { id: "6", question: "", answer1: "", answer2: "" },
          { id: "7", question: "", answer1: "", answer2: "" },
          { id: "8", question: "", answer1: "", answer2: "" },
          { id: "9", question: "", answer1: "", answer2: "" },
          { id: "10", question: "", answer1: "", answer2: "" },
          { id: "11", question: "", answer1: "", answer2: "" },
          { id: "12", question: "", answer1: "", answer2: "" },
          { id: "13", question: "", answer1: "", answer2: "" },
          { id: "14", question: "", answer1: "", answer2: "" },
          { id: "15", question: "", answer1: "", answer2: "" },
          { id: "16", question: "", answer1: "", answer2: "" },
        ],
      };

  useQuery(GET_CONTENTS, {
    variables: {
      id: +props.gameid,
    },
    onCompleted: async (data) => {
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
      if (data.getContent.userId !== +userId) {
        history.push("/");
        return;
      }
      await data.getContent.photos.map((photo: any, idx: number) => {
        uploadObj.files[idx] = {
          id: idx + 1,
          photoId: photo.id,
          photoUrl: photo.photoUrl,
          photoName: photo.photoName,
        };
      });
      setContentFiles(uploadObj.files);
      await localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
    },
  });

  function imageFormatter(cell: any) {
    return <Image src={`${cell}`} thumbnail />;
  }

  const onAfterSave = async (row: any) => {
    await editPhotoName({
      variables: {
        id: row.photoId,
        photoName: row.photoName,
      },
    });
  };

  const columns = [
    {
      dataField: "id",
      text: "이미지번호",
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
      editable: false,
    },
    {
      dataField: "photoName",
      text: "이미지 이름",
    },
  ];

  const onSubmit = () => {
    setSweetAlertShow(true);
    return;
  };

  return (
    <>
      {contentFiles === 0 ? (
        <div>loading</div>
      ) : (
        <Row className="justify-content-md-center mt-4 mx-2">
          <Col md={8} className="bg-light rounded pt-3 pb-3">
            <>
              <BootstrapTable
                keyField="id"
                data={contentFiles}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  afterSaveCell: (oldValue: any, newValue: any, row: any) => {
                    onAfterSave(row);
                  },
                })}
              />
            </>
            <Button
              block
              variant="dark"
              type="submit"
              size="lg"
              onClick={onSubmit}
            >
              수정 완료
            </Button>
          </Col>
        </Row>
      )}
      <SweetAlert
        show={sweetAlertShow}
        showConfirm={false}
        success
        title="테스트 수정 완료!"
        onConfirm={() => {
          const uploadReset = {
            title: "",
            desc: "",
            files: [],
            textTest: [
              {
                id: "1",
                question: "질문1",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "2",
                question: "질문2",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "3",
                question: "질문3",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "4",
                question: "질문4",
                answer1: "답변1",
                answer2: "답변2",
              },
              { id: "5", question: "", answer1: "", answer2: "" },
              { id: "6", question: "", answer1: "", answer2: "" },
              { id: "7", question: "", answer1: "", answer2: "" },
              { id: "8", question: "", answer1: "", answer2: "" },
              { id: "9", question: "", answer1: "", answer2: "" },
              { id: "10", question: "", answer1: "", answer2: "" },
              { id: "11", question: "", answer1: "", answer2: "" },
              { id: "12", question: "", answer1: "", answer2: "" },
              { id: "13", question: "", answer1: "", answer2: "" },
              { id: "14", question: "", answer1: "", answer2: "" },
              { id: "15", question: "", answer1: "", answer2: "" },
              { id: "16", question: "", answer1: "", answer2: "" },
            ],
          };
          inputVar({
            types: "imggame",
            step1clear: false,
            step2clear: false,
          });
          localStorage.setItem("uploadObj", JSON.stringify(uploadReset));
          history.push("/");
        }}
        onCancel={() => {
          const uploadReset = {
            title: "",
            desc: "",
            files: [],
            textTest: [
              {
                id: "1",
                question: "질문1",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "2",
                question: "질문2",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "3",
                question: "질문3",
                answer1: "답변1",
                answer2: "답변2",
              },
              {
                id: "4",
                question: "질문4",
                answer1: "답변1",
                answer2: "답변2",
              },
              { id: "5", question: "", answer1: "", answer2: "" },
              { id: "6", question: "", answer1: "", answer2: "" },
              { id: "7", question: "", answer1: "", answer2: "" },
              { id: "8", question: "", answer1: "", answer2: "" },
              { id: "9", question: "", answer1: "", answer2: "" },
              { id: "10", question: "", answer1: "", answer2: "" },
              { id: "11", question: "", answer1: "", answer2: "" },
              { id: "12", question: "", answer1: "", answer2: "" },
              { id: "13", question: "", answer1: "", answer2: "" },
              { id: "14", question: "", answer1: "", answer2: "" },
              { id: "15", question: "", answer1: "", answer2: "" },
              { id: "16", question: "", answer1: "", answer2: "" },
            ],
          };
          inputVar({
            types: "imggame",
            step1clear: false,
            step2clear: false,
          });
          localStorage.setItem("uploadObj", JSON.stringify(uploadReset));
          history.push("/");
        }}
      >
        홈화면으로 이동합니다
      </SweetAlert>
    </>
  );
};

export default ModifyTest;
