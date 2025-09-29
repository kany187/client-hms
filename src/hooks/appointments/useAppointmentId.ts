import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Appointment } from "../../types";


const apiClient = new APIClient<Appointment>('/appointments');

const useAppointmentId = (_id: string) => useQuery({
    queryKey: ['appointments', _id],
    queryFn: () => apiClient.get(_id)
})

export default useAppointmentId;
