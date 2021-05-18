import React from "react";
import EmployeesManagmentImport from "./EmployeesManagmentImport.comp";
import EmployeesManagmentForm from "./EmployeesManagmentForm.comp";
import EmployeesManagmentList from "./EmployeesManagmentList.comp";

interface Props {}

const EmployeesManagment: React.FC<Props> = (props) => {
  return (
    <>
      <EmployeesManagmentForm />
      <EmployeesManagmentImport />
      <EmployeesManagmentList />
    </>
  );
};

export default EmployeesManagment;
