import React from "react";
import { Route } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Result from "./Result";

const Multistep = () => {
  return (
    <>
      <Route path="/multistep" exact={true} component={Step1} />
      <Route path="/multistep/step2" component={Step2} />
      <Route path="/multistep/stepresult" component={Result} />
    </>
  );
};

export default Multistep;
