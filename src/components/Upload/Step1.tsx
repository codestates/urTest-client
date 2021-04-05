/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { inputVar } from "../../common/graphql/client";

interface Step1Obj {
  firstName: string;
  lastName: string;
}

const Step1 = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const input = useReactiveVar(inputVar);
  const onSubmit = (
    data: { firstName: string; lastName: string } | undefined
  ) => {
    inputVar({ ...input, ...data });
    console.log(input);
    history.push("multistep/step2");
  };
  return (
    <form onSubmit={handleSubmit<Step1Obj>(onSubmit)}>
      <h2>Step 1</h2>
      <label>
        First Name:
        <input {...register("firstName")} defaultValue={input.firstName} />
      </label>
      <label>
        Last Name:
        <input {...register("lastName")} defaultValue={input.lastName} />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Step1;
