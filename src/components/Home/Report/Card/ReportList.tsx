import { SimpleGrid } from "@chakra-ui/react";
import { ReportCard } from "./ReportCard";

const ReportList = () => {
  return (
    <SimpleGrid 
      columns={{ base: 1, sm: 2, md: 2, lg: 2 }} 
      spacing={{ base: 4, sm: 4, md: 6, lg: 6 }} 
      pt={{ base: "20px", sm: "25px", md: "30px" }}
      w="100%"
    >
      <ReportCard title={`Doctor`} />
      <ReportCard title={`Patient`} />
      <ReportCard title={`Staff`} />
      <ReportCard title={`Appointment`} />
    </SimpleGrid>
  );
};

export default ReportList;
