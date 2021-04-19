import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Container,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
  Overlay,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ShareFill,
  Trophy,
  CaretRightSquareFill,
  Eye,
} from "react-bootstrap-icons";

const TextCardItem = ({ d }: any) => {
  const ADD_VIEWS = gql`
    mutation addViews($id: Int!) {
      addViews(id: $id) {
        ok
        error
      }
    }
  `;

  const [addViews] = useMutation(ADD_VIEWS);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const [hasQuestions, setHasQuestions] = useState(false as boolean);
  useEffect(() => {
    if (d?.question) {
      setHasQuestions(true);
    } else {
      setHasQuestions(false);
    }
  }, []);
  // const renderTooltipRank = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     랭킹보기
  //   </Tooltip>
  // );

  // const renderTooltipShare = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     클립보드 복사
  //   </Tooltip>
  // );

  const renderTooltipViews = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      조회수
    </Tooltip>
  );
  return (
    <Col>
      <Container>
        <div
          className={location.pathname === "/" ? "home-cards front" : "front"}
        >
          <div className="inner header-items">
            {hasQuestions ? (
              <>
                <LinkContainer
                  to={`/${d.type}/${d.id}`}
                  onClick={() => {
                    addViews({
                      variables: {
                        id: d.id,
                      },
                    });
                  }}
                >
                  <div className="content-box">
                    <div className="start-game">
                      <div>
                        <CaretRightSquareFill />
                      </div>
                    </div>
                    <div className="answer-box">
                      <h5 className="question-body">
                        {d.question[0].questionBody}
                      </h5>
                      <span className="wordbreak">
                        {d.question[0]?.answer[0]?.body}
                      </span>
                      <span className="wordbreak">
                        {d.question[0]?.answer[1]?.body}
                      </span>
                    </div>
                  </div>
                </LinkContainer>
              </>
            ) : (
              <></>
            )}

            <div className="text-header">
              <p>{d.title}</p>
              {/* <span>{d.desc}</span> */}
              <div className="icon-box">
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipViews}
                >
                  <Button variant="info">
                    <Eye />
                    <span className="icon-view">{d.views}</span>
                  </Button>
                </OverlayTrigger>
                <LinkContainer to={`/analytics/${+d.id}/`}>
                  <Button variant="info">
                    <Trophy />
                  </Button>
                </LinkContainer>
                <Overlay target={target.current} show={show} placement="right">
                  {({ ...props }) => (
                    <div
                      {...props}
                      style={{
                        backgroundColor: "black",
                        padding: "2px 10px",
                        margin: "0 10px",
                        color: "white",
                        borderRadius: 3,
                        ...props.style,
                      }}
                    >
                      클립보드에 복사되었습니다
                    </div>
                  )}
                </Overlay>
                <CopyToClipboard text={`https://urtest.shop/textgame/${d.id}`}>
                  <Button
                    variant="info"
                    ref={target}
                    onClick={() => {
                      setTimeout(() => setShow(!show), 100);
                      setTimeout(() => setShow(show), 700);
                    }}
                  >
                    <ShareFill />
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default TextCardItem;
