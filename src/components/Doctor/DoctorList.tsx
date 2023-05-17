import { Spinner, SimpleGrid } from "@chakra-ui/react";
import useDoctors from "../../hooks/doctors/useDoctors";
import { DoctorCard } from "./DoctorCard";

export const DoctorList = () => {
  const { data, isLoading, error } = useDoctors();
  if (error) return null;

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  return (
    <div>
      {
        <SimpleGrid columns={3} spacing={4}>
          {data?.map((s) => (
            <DoctorCard key={s._id} doctor={s} />
          ))}
        </SimpleGrid>
      }
    </div>
  );
};
