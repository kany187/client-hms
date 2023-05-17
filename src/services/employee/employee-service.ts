import APIClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiClient = new APIClient<Employee>('/hospital/emp/staff');
//import create from '../http-service';

export interface Employee {
    firstName: string,
    lastName: string,
    role: string,
    deptName: string
    status: string
}

class EmployeeService {
    // getAll() {
    //     const controller = new AbortController();
    //    const request =  apiClient
    //   .get<Employee[]>("/users", {
    //     signal: controller.signal
    //   })
    //   return { request, cancel: () => controller.abort()}
    // }

    // delete(id: number) {
    //     return apiClient.delete("/users/" + id);
    // }

    create(user: Employee){
        return apiClient.post(user);
    }

    // update(user: Employee) {
    //     return apiClient.patch("/users" + user);
    //   }
}

export default new EmployeeService();

//export default create('hospital/emp/staff')