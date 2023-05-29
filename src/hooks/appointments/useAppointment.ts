import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Appointment>('/appointments');

export interface Appointment {
    _id?: string,
    patientName: string,
    title: string,
    service: string,
    doctor: string,
    startDate: string,
    startTime: string,
    phone: string
    desc: string
}

const useAppointment = () => useQuery({
    queryKey: ['appointments'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default useAppointment;