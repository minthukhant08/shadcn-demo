type LoginPayload = {
    email: string,
    password: string
}

type APIResponse<T> = {
    code: number,
    success: boolean,
    data: T,
    message: string
}