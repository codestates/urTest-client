import React from "react";
import { Route } from "react-router-dom";
import Step1 from "./Step1";
import Step2img from "./Step2img";
import Step2text from "./Step2text";
import Result from "./Result";

const Multistep = () => {
  return (
    <>
      <Route path="/multistep" exact={true} component={Step1} />
      <Route path="/multistep/step2img" component={Step2img} />
      <Route path="/multistep/step2text" component={Step2text} />
      <Route path="/multistep/stepresult" component={Result} />
    </>
  );
};

export default Multistep;
