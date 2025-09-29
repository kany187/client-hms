import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Appointment } from "../../types";

const apiClient = new APIClient<Appointment>('/appointments');

const useAppointment = () => useQuery({
    queryKey: ['appointments'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24h
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
})

export default useAppointment;