import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import { inputVar } from "../../common/graphql/client";
import { Col, Row, Button } from "react-bootstrap";
import SingleDropzone from "./SingleDropzone";

const Step2 = () => {
  const input = useReactiveVar(inputVar);
  const history = useHistory();
  const products = [
    { id: "test1", name: "name1", price: "1000" },
    { id: "test2", name: "name2", price: "2000" },
    { id: "test3", name: "name3", price: "3000" },
    { id: "test4", name: "name4", price: "4000" },
    { id: "test5", name: "name5", price: "5000" },
  ];
  const columns = [
    {
      dataField: "id",
      text: "문항 ID",
    },
    {
      dataField: "name",
      text: "파일명",
    },
    {
      dataField: "price",
      text: "Product Price",
      // eslint-disable-next-line react/display-name
      editorRenderer: (editorProps: any, value: any) => (
        <SingleDropzone {...editorProps} value={value} />
      ),
    },
  ];
  const onSubmit = (data: any) => {
    console.log(products);
    history.push("/multistep/stepresult");
  };
  const onAfterSave = (data: any) => {
    console.log(data);
    // history.push("multistep/stepResult");
  };
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <Row className="justify-content-md-center">
        <Col md={8} className="bg-light rounded pt-3 pb-3">
          <BootstrapTable
            keyField="id"
            data={products}
            columns={columns}
            cellEdit={cellEditFactory({
              mode: "click",
              afterSaveCell: (
                oldValue: any,
                newValue: any,
                row: any,
                column: any
              ) => {
                onAfterSave(newValue);
              },
            })}
          />
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
    </>
  );
};

export default Step2;
