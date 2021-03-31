import React, { useState } from "react";

import { Toast, Button, Container } from "react-bootstrap";

import { gql, useQuery } from "@apollo/client";

const GET_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
      rate
      name
    }
  }
`;

const Toasts = () => {
  const [show, toggleShow] = useState(true);
  const { loading, error, data } = useQuery(GET_RATES, {
    variables: { currency: "USD" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Container className="md-6 p-3">
        <Toast show={show} onClose={() => toggleShow(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        {console.log(data)}
        {data?.rates?.map?.((rate: any) => (
          <div key={rate.currency}>
            <p>
              {rate.name}: {rate.rate}
            </p>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Toasts;
