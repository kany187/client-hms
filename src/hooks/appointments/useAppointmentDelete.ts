import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Appointment } from "./useAppointment";

const apiClient = new APIClient<Appointment>('/appointments');


 const useAppointmentDelete = (_id: string) => {
    const queryClient =  useQueryClient();
    
    const deleteAppointment = async () => {
        await apiClient.delete(_id)
    }
    return useMutation(deleteAppointment, {
     onSuccess: () => {
         queryClient.invalidateQueries({
             queryKey: ['appointments']
         })
     }
     })
 }

export default useAppointmentDelete;
