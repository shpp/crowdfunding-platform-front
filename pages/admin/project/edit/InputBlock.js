import { Form } from 'react-bootstrap';
import React from 'react';

const CustomBlock = ({ inputLabels, handleChange }) => {
  return (
    <>
      {
        inputLabels.map((input) => (
          <Form.Group key={input.name}>
            <Form.Label>{input.label}</Form.Label>
            <Form.Control
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>
        ))
      }
    </>
  );
};

export default CustomBlock;
