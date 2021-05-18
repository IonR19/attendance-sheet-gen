import React from "react";
import { Button, Table } from "react-bulma-components";
import { useDispatch } from "react-redux";
import { removeEmployee, selectEmployees, useTypedSelector } from "../store";

interface Props {}

const EmployeesManagmentList: React.FC<Props> = (props) => {
  const emps = useTypedSelector(selectEmployees);
  const dispatch = useDispatch();

  return (
    <div style={{ height: 350, overflowY: "scroll" }}>
      <Table size="fullwidth" striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Civil ID</th>
            <th>File No</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <tr key={emp.id!}>
              <td>{emp.name}</td>
              <td>{emp.civil_id}</td>
              <td>{emp.file_no}</td>
              <td>
                <Button>Toggle</Button>
                <Button remove onClick={() => dispatch(removeEmployee(emp.id!))}></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeesManagmentList;
