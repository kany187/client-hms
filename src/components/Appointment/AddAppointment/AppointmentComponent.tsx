import { Box, Select, Stack } from "@chakra-ui/react";
import { useState } from "react";
import useDepartment from "../../../hooks/department/useDepartment";
import useDoctors from "../../../hooks/doctors/useDoctors";
import useStaff from "../../../hooks/staffs/useStaff";

interface Props {
  deptName: (dept: string) => void;
  doctorName: (doc: string) => void;
}

const AppointmentComponent = ({ deptName, doctorName }: Props) => {
  const { data, error } = useDepartment();
  const { data: doctors } = useStaff();

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  deptName(selectedDept);
  doctorName(selectedDoctor);

  return (
    <>
      <Stack direction="row" spacing={10} ml="30" pt="10">
        <Box>
          <Select
            placeholder="Doctor"
            width="100%"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            {doctors
              ?.filter((doctor) => doctor.deptName === selectedDept)
              .map((doctor) => (
                <option key={doctor.employeeId}>
                  {doctor.employeeId.firstName} {doctor.employeeId.lastName}
                </option>
              ))}
          </Select>
        </Box>
        <Box>
          <Select
            placeholder="Department"
            width="100%"
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {data
              ?.filter(
                (item, index, array) =>
                  index === array.findIndex((i) => i.deptName === item.deptName)
              )
              .map((dept) => (
                <option key={dept._id} value={dept.deptName}>
                  {dept.deptName}
                </option>
              ))}
          </Select>
        </Box>
      </Stack>
    </>
  );
};

export default AppointmentComponent;
