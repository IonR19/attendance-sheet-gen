import React from "react";
import { Button, Columns, Form } from "react-bulma-components";

interface Props {}

const EmployeesManagmentList: React.FC<Props> = (props) => {
  return (
    <form>
      <Columns>
        <Columns.Column>
          <Form.Label>
            Name
            <Form.Input></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Form.Label>
            Civil ID
            <Form.Input></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Form.Label>
            File No
            <Form.Input></Form.Input>
          </Form.Label>
        </Columns.Column>
        <Columns.Column>
          <Button type="submit">Add</Button>
        </Columns.Column>
      </Columns>
    </form>
  );
};

export default EmployeesManagmentList;
