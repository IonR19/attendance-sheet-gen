import React from "react";
import { read } from "xlsx";
interface Props {}

const EmployeesManagmentImport: React.FC<Props> = (props) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.arrayBuffer().then((data) => {
      const processedData = read(data, { type: "buffer" });
      const { Sheets,SheetNames } = processedData;
      const main = Sheets[SheetNames[0]];
      console.log(main);
      
    });
    //   const reader = new FileReader();
    //   reader.readAsBinaryString(file);

    //   reader.onload = (e) => {
    //     const x = read(e.target?.result, { type: "binary" });
    //     console.log(x);
    //   };
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default EmployeesManagmentImport;
