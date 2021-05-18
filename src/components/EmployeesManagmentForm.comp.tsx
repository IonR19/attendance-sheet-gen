import React, { useState } from "react";
import { Button, Columns, Form } from "react-bulma-components";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store";
import { iUser } from "../types";
interface Props {}

const EmployeesManagmentForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<iUser>({
    name: "",
    civil_id: "",
    file_no: "",
  });

  const onFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(addEmployee(inputs));
  };

  const { name, civil_id, file_no } = inputs;

  return (
    <form onSubmit={onFormSubmit}>
      <Columns>
        <Columns.Column>
          <Form.Label>
            Name
            <Form.Input name="name" value={name} onInput={onFormChange}></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Form.Label>
            Civil ID
            <Form.Input required name="civil_id" value={civil_id} onChange={onFormChange}></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Form.Label>
            File No
            <Form.Input required name="file_no" value={file_no} onChange={onFormChange}></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Button type="submit">Add</Button>
        </Columns.Column>
      </Columns>
    </form>
  );
};

export default EmployeesManagmentForm;
