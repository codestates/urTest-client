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
const ImgCardItem = ({ d }: any) => {
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

  const [hasPhotos, setHasPhotos] = useState(false as boolean);
  useEffect(() => {
    if (d?.photos) {
      setHasPhotos(true);
    } else {
      setHasPhotos(false);
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
          <div className="inner header-items ">
            {hasPhotos ? (
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
                    <div className="img-box">
                      <img src={d?.photos[0]?.photoUrl} alt="img" />
                      <img src={d?.photos[1]?.photoUrl} alt="img" />
                    </div>
                  </div>
                </LinkContainer>
              </>
            ) : (
              <></>
            )}

            <div className="text-box">
              <div>
                <p>{d.title}</p>
              </div>
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
                <CopyToClipboard text={`https://urtest.shop/imggame/${d.id}`}>
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

export default ImgCardItem;
