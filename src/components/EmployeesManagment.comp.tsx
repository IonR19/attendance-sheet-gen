import React from "react";
import EmployeesManagmentList from "./EmployeesManagmentList.comp";

interface Props {}

const EmployeesManagment: React.FC<Props> = (props) => {
  return (
    <>
      <EmployeesManagmentList />
    </>
  );
};

export default EmployeesManagment;
