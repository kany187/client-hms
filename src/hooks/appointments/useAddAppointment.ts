import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Appointment } from "./useAppointment";

const apiClient = new APIClient<Appointment>('/appointments');

const useAddAppointment = () => {
    const queryClient =  useQueryClient();
 
    return useMutation<Appointment, Error, Appointment>({
         mutationFn: apiClient.post,
     onSuccess: (savedAppointment, newAppointment) => {
         console.log(savedAppointment);
 
         queryClient.invalidateQueries({
             queryKey: ['appointments']
         })
     }
     })
 }

export default useAddAppointment;