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

// 쿼리
const GET_CONTENTS = gql`
  query getContent($id: Int!) {
    getContent(id: $id) {
      photos {
        id
        photoUrl
        photoName
      }
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

const Step3img = () => {
  const history = useHistory();
  const uploadObjStr = localStorage.getItem("uploadObj");
  const input = useReactiveVar(inputVar);
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

  const { loading } = useQuery(GET_CONTENTS, {
    variables: {
      id: uploadObj.contentId,
    },
    onCompleted: async (data) => {
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

  const onAfterSave = async (row: any, newValue: any) => {
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

  const onSubmit = (data: any) => {
    inputVar({ ...input, step2clear: true });
    history.push("/multistep/step3text");
  };
  return (
    <>
      {/* {!input.step2clear ? <Redirect to="/multistep" /> : ""} */}
      {contentFiles === 0 ? (
        <div>loading</div>
      ) : (
        <Row className="justify-content-md-center mt-4">
          <Col md={8} className="bg-light rounded pt-3 pb-3">
            <>
              <BootstrapTable
                keyField="id"
                data={contentFiles}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  afterSaveCell: (
                    oldValue: any,
                    newValue: any,
                    row: any,
                    column: any
                  ) => {
                    onAfterSave(row, newValue);
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
              Next Step
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Step3img;
