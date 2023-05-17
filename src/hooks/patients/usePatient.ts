import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Patient>('/patient');

export interface Patient {
    _id?: string,
    firstName: string,
    lastName: string,
    addressStreet: string,
    addressCity: string,
    phone: string,
    gender: string,
    dob: string
    marital?: string,
    occupation?: string,
    desc?: string
}

const usePatient = () => useQuery({
    queryKey: ['patients'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default usePatient
  