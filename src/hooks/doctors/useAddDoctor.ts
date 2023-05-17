import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Doctor>('hospital/emp/doctor');

export interface Doctor {
    _id?: string,
    departmentId: string,
    firstName: string,
    lastName: string,
    specialty: string,
    phone: string,
    email: string,
    background_img?: string
}

const useAddDoctor = () => {
    const queryClient =  useQueryClient();

    return useMutation<Doctor, Error, Doctor>({
         mutationFn: apiClient.post,
     onSuccess: (savedDoctor, newDoctor) => {
         console.log(savedDoctor);
 
         queryClient.invalidateQueries({
             queryKey: ['doctors']
         })
     }
     })
}

export default useAddDoctor;