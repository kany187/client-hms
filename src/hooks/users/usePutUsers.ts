import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIClient from '../../services/api-client';
import { User } from '../../services/user/useUser';

const apiClient = new APIClient<User>('/users');

const usePutUsers = (_id: string) => {

    const queryClient =  useQueryClient();
    
    const updateUser = async (data: User) => {
        await apiClient.put(`${_id}`, data)
    }
    return useMutation(updateUser, {
     onSuccess: (data) => {
         queryClient.invalidateQueries({
             queryKey: ['userss']
         })
     }
     })
}

export default usePutUsers;