import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Doctors>('/doctor');

export interface Doctors {
    _id?: string,
    employeeId: any,
    departmentId: any,
    background_img: string,
    // deptName: string,
    // role: string,
    // hospitalId: string,
    // phone: string,
    // deptHead: string,
    specialty: string
}

const useDoctors = () => useQuery({
    queryKey: ['doctors'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default useDoctors;