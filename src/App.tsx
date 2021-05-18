import React from "react";
import { Box, Container } from "react-bulma-components";
import DisplayTable from "./components/DisplayTable.comp";
import EmployeesManagment from "./components/EmployeesManagment.comp";
import TimeFilter from "./components/TimeFilter.comp";

interface Props {}

const App = (props: Props) => {
  return (
    <Container>
      <Box>
        <EmployeesManagment />
      </Box>
      <Box>
        <TimeFilter />
      </Box>
      <Box>
        <DisplayTable />
      </Box>
    </Container>
  );
};

export default App;
