import React from "react";
import { useReactiveVar } from "@apollo/client";
import { Redirect } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { inputVar } from "../../common/graphql/client";

const Step2 = () => {
  const input = useReactiveVar(inputVar);
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
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ];
  return (
    <>
      {!input.step1clear ? <Redirect to="/multistep" /> : ""}
      <BootstrapTable keyField="id" data={products} columns={columns} />
    </>
  );
};

export default Step2;
