import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Hospital } from "./useHospital";

const apiClient = new APIClient<Hospital>('/hospital');

const useHospitalId = (_id: string) => useQuery({
    queryKey: ['hospitals', _id],
    queryFn: () => apiClient.get(_id)
})

export default useHospitalId