import { SimpleGrid } from "@chakra-ui/react";
import { ReportCard } from "./ReportCard";

const ReportList = () => {
  return (
    <SimpleGrid columns={2} spacing={3} pt="35px">
      <ReportCard title={`Doctor`} />
      <ReportCard title={`Patient`} />
      <ReportCard title={`Staff`} />
      <ReportCard title={`Appointment`} />
    </SimpleGrid>
  );
};

export default ReportList;
