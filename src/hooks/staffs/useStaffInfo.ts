import { useQuery } from "@tanstack/react-query";
import { StaffQuery } from "../../pages/Staff/Staffs";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Staff>('/staff');

export interface Staff {
    _id: string;
    employeeId: any;
    role: string,
    deptName: string;
    status: string;
  }

const useStaffInfo = (staffQuery: StaffQuery) => 
useQuery<Staff[], Error>({
  queryKey: ['staff', staffQuery],
  queryFn: async () => {
   const res =  await apiClient.getAll({
      params: {
        role: staffQuery.role?.role, 
        status: staffQuery.filter,
        deptName: staffQuery.dept?.length ?? 0 > 0 ? staffQuery.dept : 'All',
        search: staffQuery.searchText
      },
    })
    return res
  }
})

export default useStaffInfo;