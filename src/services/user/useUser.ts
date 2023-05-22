import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import APIClient from '../api-client';

const apiClient = new APIClient<User>('/users/me');

export interface User {
    name: string,
    email: string,
}

const useUser = () => useQuery({
    queryKey: ['users'],
    queryFn: apiClient.getMe,
    staleTime: 24 * 60 * 60 * 1000 //24h
})


export default useUser;