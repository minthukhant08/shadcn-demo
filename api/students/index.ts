import { authInstance as axios } from "@/api";
import { route } from "./routes";

export const studentAPI = {
    all: (params: string) => axios.get<APIResponse<StudentListResponse>>(route.resource + "?" + params),
    get: (id: number) => axios.get<APIResponse<Student>>(route.resource + "/" + id),
    create: (student: CreateStudentPayload) => axios.post(route.resource, {...student}),
    delete: (id: number) => axios.delete(route.resource + "/" + id )
}