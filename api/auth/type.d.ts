type LoginPayload = {
    email: string,
    password: string
}

type AuthReponse = {
    id: number,
    name: string,
    email: string,
    roles: Role
    token: string
}

type APIResponse<T> = {
    code: number,
    success: boolean,
    data: T,
    message: string
}