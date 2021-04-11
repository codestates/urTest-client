import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { inputVar, uploadVar } from "../../common/graphql/client";
import { useReactiveVar, useMutation, gql } from "@apollo/client";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!, $id: Int!) {
    uploadPhoto(file: $file, id: $id) {
      contentId
      id
      photoUrl
      photoName
    }
  }
`;

export default function Previews(props) {
  // eslint-disable-next-line react/prop-types
  const [files, setFiles] = useState([]);
  const input = useReactiveVar(inputVar);
  useReactiveVar(uploadVar);
  const uploadObjStr = localStorage.getItem("uploadObj");
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
  const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
    onCompleted: (data) => {
      console.log(data);
      return;
    },
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 64,
    accept: "image/*",
    onDrop: useCallback(async (acceptedFiles) => {
      await uploadVar(true);
      setTimeout(() => {
        uploadVar(false);
      }, 3000);
      if (acceptedFiles.length < 4) {
        setFiles([]);
        inputVar({ ...input, files: [] });
        return alert("4~64개의 파일이 필요합니다");
      }
      uploadObj.files = acceptedFiles;
      localStorage.setItem("uploadObj", JSON.stringify(uploadObj));
      await acceptedFiles.map(async (file) => {
        uploadPhoto({
          variables: {
            file: file,
            id: uploadObj.contentId,
          },
        });
      });

      await setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }, []),
  });

  const thumbs =
    // eslint-disable-next-line react/prop-types
    props.files.length !== 0
      ? // eslint-disable-next-line react/prop-types
        props.files.map((file) => (
          <div style={thumb} key={file.photoName}>
            <div style={thumbInner}>
              <img src={file.photoUrl} style={img} />
            </div>
          </div>
        ))
      : files.map((file) => (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              <img src={file.preview} style={img} />
            </div>
          </div>
        ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>업로드에 사용할 파일들을 올려주세요</p>
        <p>다음단계에서 파일들을 수정 할 수 있습니다</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
