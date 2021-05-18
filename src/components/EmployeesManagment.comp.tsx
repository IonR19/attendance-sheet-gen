import React from "react";
import EmployeesManagmentImport from "./EmployeesManagmentImport.comp";
import EmployeesManagmentList from "./EmployeesManagmentList.comp";

interface Props {}

const EmployeesManagment: React.FC<Props> = (props) => {
  return (
    <>
      <EmployeesManagmentList />
      <EmployeesManagmentImport />
    </>
  );
};

export default EmployeesManagment;
