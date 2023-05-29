import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '../../services/api-client';
import { Message } from './useMessageId';


const apiClient = new APIClient<Message>('/hospital/message');

 const useAddMessage = () => {
    const queryClient =  useQueryClient();
 
    return useMutation<Message, Error, Message>({
         mutationFn: apiClient.post,
     onSuccess: (savedMessage, newMessage) => {
         console.log(savedMessage);
 
         queryClient.invalidateQueries({
             queryKey: ['messages']
         })
     }
     })
 }

 export default useAddMessage;