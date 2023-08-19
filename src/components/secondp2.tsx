import IndeterminateCheckbox from "./formcomponent";
const departments = [
  {
    id: "dept1",
    name: "Department 1",
    subDepartments: [
      { id: "subdept1", name: "Sub-Department 1.1" },
      { id: "subdept2", name: "Sub-Department 1.2" },
    ],
  },
  {
    id: "dept2",
    name: "Department 2",
    subDepartments: [
      { id: "subdept3", name: "Sub-Department 2.1" },
      { id: "subdept4", name: "Sub-Department 2.2" },
    ],
  },
];

const SecondComponent: React.FC = () => {
  return (
    <div>
      {departments.map((department) => (
        <IndeterminateCheckbox key={department.id} department={department} />
      ))}
    </div>
  );
};


export default SecondComponent