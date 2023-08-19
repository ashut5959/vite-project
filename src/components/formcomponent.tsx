import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { Collapse, Container, IconButton } from "@mui/material";

interface Department {
  id: string;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: string;
  name: string;
}
interface IndeterminateCheckboxProps {
  department: Department;
}

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
  department,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [subChecked, setSubChecked] = React.useState<boolean[]>(
    new Array(department.subDepartments.length).fill(false)
  );

  const handleSubChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSubChecked = [...subChecked];
      updatedSubChecked[index] = event.target.checked;
      setSubChecked(updatedSubChecked);
    };

  const handleMainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubChecked(subChecked.map(() => event.target.checked));
  };

  const isSubIndeterminate =
    subChecked.some((subCheck) => subCheck) &&
    subChecked.some((subCheck) => !subCheck);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  return (
    <Container>
      <div style={{display: "flex", flexDirection:"row"}}>
        <FormControlLabel
          label={department.name}
          control={
            <Checkbox
              checked={subChecked.every((subCheck) => subCheck)}
              indeterminate={isSubIndeterminate}
              onChange={handleMainChange}
            />
          }
        />
        <div style={{margin: "auto 3rem"}}>({department.subDepartments.length})</div>
        <IconButton onClick={handleCollapseToggle} >
          <ArrowDropDownSharpIcon />
        </IconButton>
      </div>
        {/* <div >
        <FormControlLabel
          label={department.name}
          control={
            <Checkbox
              checked={subChecked.every((subCheck) => subCheck)}
              indeterminate={isSubIndeterminate}
              onChange={handleMainChange}
              onClick={handleCollapseToggle}
            />
          }
        />
      </div> */}
        <Collapse in={!collapsed}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 3,
              left: " 10%",
            }}
          >
            {department.subDepartments.map((subDept, index) => (
              <FormControlLabel
                key={subDept.id}
                label={subDept.name}
                control={
                  <Checkbox
                    checked={subChecked[index]}
                    onChange={handleSubChange(index)}
                  />
                }
              />
            ))}
          </Box>
        </Collapse>
    </Container>
  );
};

export default IndeterminateCheckbox;
