import { useQuery } from '@tanstack/react-query'
import APIClient from '../../services/api-client';


const apiClient = new APIClient<Message>('/hospital/message');

export interface Message {
    _id?: string,
    conversationId: string,
    sender: string,
    text: string
}

export const useMessageId = (_id: string) => useQuery({
  queryKey: ['messages', _id],
  queryFn: () => apiClient.getById(_id)
})
