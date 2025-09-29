import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Patient } from "../../types";

const apiClient = new APIClient<Patient>('/patient');

const usePatientId = (_id: string) => useQuery({
    queryKey: ['patients', _id],
    queryFn: () => apiClient.get(_id)
})

export default usePatientId