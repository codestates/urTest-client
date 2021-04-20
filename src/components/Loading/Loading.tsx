import React from "react";
import { Container } from "react-bootstrap";

const Loading = (props: any) => {
  return (
    <>
      <Container
        className={
          props.bookMarkLoading ? "scroll-setting-bookmark" : "scroll-setting"
        }
      >
        <div className="loading">
          <div className="loadingio-spinner-spinner-r7eay34vek">
            <div className="ldio-92u190um96r">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Loading;
