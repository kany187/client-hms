import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '../../services/api-client';
import { Conversation } from './useConversation';


const apiClient = new APIClient<Conversation>('/hospital/conversation');

 const useAddConversation = () => {
    const queryClient =  useQueryClient();
 
    return useMutation<Conversation, Error, Conversation>({
         mutationFn: apiClient.post,
     onSuccess: (savedConversation, newConversation) => {
         console.log(savedConversation);
 
         queryClient.invalidateQueries({
             queryKey: ['conversations']
         })
     }
     })
 }

 export default useAddConversation;
