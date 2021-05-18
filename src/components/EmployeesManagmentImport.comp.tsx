import React from "react";
import { Form } from "react-bulma-components";
import { useDispatch } from "react-redux";
import { read, utils } from "xlsx";
import { addGroup } from "../store";
import { iUser } from "../types";
interface Props {}

const EmployeesManagmentImport: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.arrayBuffer().then((data) => {
      const processedData = read(data, { type: "buffer" });
      const { Sheets, SheetNames } = processedData;
      const main = Sheets[SheetNames[0]];

      let employees = utils.sheet_to_json<iUser>(main);
      dispatch(addGroup(employees));
    });
  };

  return (
    <div>
      <Form.InputFile onChange={onChange}></Form.InputFile>
    </div>
  );
};

export default EmployeesManagmentImport;
