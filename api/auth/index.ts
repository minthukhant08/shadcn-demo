import axios from "@/api";
import { route } from "./routes";

export const authAPI = {
    login: (payload: LoginPayload) => axios.post<APIResponse<String>>(route.login, { ...payload }) 
}