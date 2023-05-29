import { useQuery } from '@tanstack/react-query'
import APIClient from '../../services/api-client';


const apiClient = new APIClient<Conversation>('/hospital/conversation');

export interface Conversation {
    _id?: string,
    members: [string]
}

const useConversation = (_id: string) => useQuery({
    queryKey: ['conversations', _id],
    queryFn: () => apiClient.getById(_id)
})

export default useConversation;