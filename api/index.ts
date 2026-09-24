import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

const noAuthInstance = axios.create({
    baseURL: process.env.BACKEND_URL + "/api/"
})

export const authInstance = axios.create({
    baseURL: process.env.BACKEND_URL + "/api/"
})

authInstance.interceptors.request.use(async (config)=> {
    const session = await getServerSession(authOptions)
    if (session){
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    
    return config
})

export default noAuthInstance