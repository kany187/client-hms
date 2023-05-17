import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Patient } from "./usePatient";

const apiClient = new APIClient<Patient>('/patient');

const useAddPatient = () => {
   const queryClient =  useQueryClient();

   return useMutation<Patient, Error, Patient>({
        mutationFn: apiClient.post,
    onSuccess: (savedPatient, newPatient) => {
        console.log(savedPatient);

        queryClient.invalidateQueries({
            queryKey: ['patients']
        })
    }
    })
}

export default useAddPatient;