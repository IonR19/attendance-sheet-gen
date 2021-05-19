import React from "react";
import { Box, Button, Table } from "react-bulma-components";
import { useDispatch } from "react-redux";
import {
  removeEmployee,
  selectActiveEmployees,
  selectEmployees,
  toggleAllUser,
  toggleUser,
  useTypedSelector,
} from "../store";

interface Props {}

const EmployeesManagmentList: React.FC<Props> = (props) => {
  const emps = useTypedSelector(selectEmployees);
  const activeEmps = useTypedSelector(selectActiveEmployees);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div style={{ height: 350, overflowY: "scroll" }}>
        <Table bordered size="fullwidth">
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
              <tr key={emp.id!} className={!emp.disabled ? "is-selected" : ""}>
                <td>{emp.name}</td>
                <td>{emp.civil_id}</td>
                <td>{emp.file_no}</td>
                <td>
                  <Button onClick={() => dispatch(toggleUser(emp.id!))}>
                    {emp.disabled ? "enable" : "disable"}
                  </Button>
                  <Button remove onClick={() => dispatch(removeEmployee(emp.id!))}></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Box>
        Total:{emps.length}, Disabled:{emps.length - activeEmps.length}, Active:
        {activeEmps.length}
      </Box>
      <Button.Group>
        <Button onClick={() => dispatch(toggleAllUser(true))}>Disable All</Button>
        <Button onClick={() => dispatch(toggleAllUser(false))}>Enable All</Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default EmployeesManagmentList;
