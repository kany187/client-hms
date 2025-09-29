import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Patient } from "../../types";

const apiClient = new APIClient<Patient>('/patient');

const usePatient = () => useQuery({
    queryKey: ['patients'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default usePatient
  