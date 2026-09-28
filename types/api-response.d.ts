
type APIResponse<T> = {
    code: number,
    success: boolean,
    data: T,
    message: string
}

type Pagination = {
    current_page: number,
    per_page: number,
    total: number,
    last_page: number,
    next_page: number
}