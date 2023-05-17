import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Hospital>('/hospital');

export interface Hospital {
    _id?: string,
    hospitalName: string,
    phone: string,
    street: string,
    city: string,
    category: string
}

 const useHospital = () => useQuery({
    queryKey: ['hospitals'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default useHospital;
