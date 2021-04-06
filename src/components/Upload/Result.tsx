import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { inputVar } from "../../common/graphql/client";
import { useReactiveVar } from "@apollo/client";
import { Col, Row, Button, Jumbotron } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const StepResult = () => {
  const history = useHistory();
  const input = useReactiveVar(inputVar);
  const onSubmit = (data: any) => {
    inputVar({ ...input, step2clear: true });
    history.push("/multistep/stepresult");
  };

  return (
    <>
      {!input.step2clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <LinkContainer to="/">
              <Button
                block
                variant="dark"
                type="submit"
                size="lg"
                onClick={onSubmit}
              >
                완료
              </Button>
            </LinkContainer>
          </Jumbotron>
        </Col>
      </Row>
    </>
  );
};

export default StepResult;
