import React from "react";
import { useReactiveVar } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";

const Step2 = () => {
  const input = useReactiveVar(inputVar);

  return (
    <div>
      Step2
      {input.firstName}
      {input.lastName}
    </div>
  );
};

export default Step2;
