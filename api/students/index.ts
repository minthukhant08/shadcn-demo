import { authInstance as axios } from "@/api";
import { route } from "./routes";

export const studentAPI = {
    all: () => axios.get<APIResponse<Student[]>>(route.resource)
}